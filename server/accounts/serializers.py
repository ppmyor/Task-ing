from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import User
from django.contrib.auth.password_validation import validate_password
from dj_rest_auth.registration.serializers import SocialLoginSerializer
from django.contrib.auth import authenticate
from requests.exceptions import HTTPError
from django.contrib.auth import get_user_model

try:
    from allauth.account import app_settings as allauth_settings
    from allauth.socialaccount.helpers import complete_social_login

except ImportError:
    raise ImportError('allauth needs to be added to INSTALLED_APPS.')


class CreateUserSerializer(ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "비밀번호가 일치하지 않습니다."})

        return attrs


    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            name=validated_data['name'],
        )
        
        user.set_password(validated_data['password'])
        user.save()

        return user


    class Meta:
        model = User
        fields = '__all__'



class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=30)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        fields = ['username']



class SocialLoginSerializer2(SocialLoginSerializer):
    # uid = serializers.IntegerField(required=False)
    # grade = serializers.ReadOnlyField()

    def validate(self, attrs):
        login = self.get_login(attrs)

        # self.uid = login.account.user.uid
        # login.account.user.uid = login.account.uid

        attrs['user'] = login.account.user
        # attrs['uid'] = login.account.user.uid
        user = attrs['user']
        user.save()

        return attrs

    def get_login(self, attrs):
        # 원래는 validate인데, 기능이 여러개라 get_login으로 분할함
        view = self.context.get('view')
        request = self._get_request()
        if not view:
            raise serializers.ValidationError(
                _('View is not defined, pass it as a context variable'),
            )

        adapter_class = getattr(view, 'adapter_class', None)
        if not adapter_class:
            raise serializers.ValidationError(
                _('Define adapter_class in view'))

        adapter = adapter_class(request)
        app = adapter.get_provider().get_app(request)

        access_token = attrs.get('access_token')
        code = attrs.get('code')
        # Case 1: We received the access_token
        if access_token:
            tokens_to_parse = {'access_token': access_token}
            token = access_token
            # For sign in with apple
            id_token = attrs.get('id_token')
            if id_token:
                tokens_to_parse['id_token'] = id_token

        # Case 2: We received the authorization code
        elif code:
            self.set_callback_url(view=view, adapter_class=adapter_class)
            self.client_class = getattr(view, 'client_class', None)

            if not self.client_class:
                raise serializers.ValidationError(
                    _('Define client_class in view'),
                )

            provider = adapter.get_provider()
            scope = provider.get_scope(request)
            client = self.client_class(
                request,
                app.client_id,
                app.secret,
                adapter.access_token_method,
                adapter.access_token_url,
                self.callback_url,
                scope,
                scope_delimiter=adapter.scope_delimiter,
                headers=adapter.headers,
                basic_auth=adapter.basic_auth,
            )
            token = client.get_access_token(code)
            access_token = token['access_token']
            tokens_to_parse = {'access_token': access_token}

            # If available we add additional data to the dictionary
            for key in ['refresh_token', 'id_token', adapter.expires_in_key]:
                if key in token:
                    tokens_to_parse[key] = token[key]
        else:
            raise serializers.ValidationError(
                _('Incorrect input. access_token or code is required.'),
            )

        social_token = adapter.parse_token(tokens_to_parse)
        social_token.app = app

        try:
            login = self.get_social_login(adapter, app, social_token, token)
            complete_social_login(request, login)
        except HTTPError:
            raise serializers.ValidationError(_('Incorrect value'))

        if not login.is_existing:
            # We have an account already signed up in a different flow
            # with the same email address: raise an exception.
            # This needs to be handled in the frontend. We can not just
            # link up the accounts due to security constraints
            if allauth_settings.UNIQUE_EMAIL:
                # Do we have an account already with this email address?
                account_exists = get_user_model().objects.filter(
                    email=login.user.email,
                ).exists()
                if account_exists:
                    raise serializers.ValidationError(
                        _('User is already registered with this e-mail address.'),
                    )

            login.lookup()
            login.save(request, connect=True)
        return login