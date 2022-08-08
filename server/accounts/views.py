from rest_auth.registration.views import SocialLoginView
from .serializers import SocialLoginSerializer2, CreateUserSerializer
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from django.utils.module_loading import import_string

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.kakao.views import KakaoOAuth2Adapter
from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
from allauth.socialaccount.providers.naver.views import NaverOAuth2Adapter
from django.conf import settings
from django.utils import timezone
from rest_framework.response import Response
from rest_framework import status, generics
from .serializers import UserLoginSerializer
from dj_rest_auth.serializers import JWTSerializer


User = get_user_model()


class CreateUserViewSet(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = CreateUserSerializer
    # permission_classes = (IsLogoutUser,)



class Login(generics.GenericAPIView):
    serializer_class = UserLoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if not serializer.is_valid(raise_exception=True):
            return Response({"FAIL_Message": "요청 유형이 잘못되었습니다."}, status=status.HTTP_409_CONFLICT)

        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        # print(request.data.get('login_type'))
        if user['id'] == "None":
            return Response({"FAIL_Message": "로그인 정보가 없습니다."}, status=status.HTTP_401_UNAUTHORIZED)



class SocialLoginView2(SocialLoginView):
    def get_response(self):
        super().get_response()

        serializer_class = JWTSerializer2
        if getattr(settings, 'REST_USE_JWT', False):
            from rest_framework_simplejwt.settings import (
                api_settings as jwt_settings,
            )
            access_token_expiration = (
                timezone.now() + jwt_settings.ACCESS_TOKEN_LIFETIME)
            refresh_token_expiration = (
                timezone.now() + jwt_settings.REFRESH_TOKEN_LIFETIME)
            return_expiration_times = getattr(
                settings, 'JWT_AUTH_RETURN_EXPIRATION', False)
            uid = self.user.uid
            data = {
                'user': {
                    'pk': self.user.pk,
                    'email': self.user.email,
                    'uid': uid
                },
                'access_token': self.access_token,
                'refresh_token': self.refresh_token,
            }

            if return_expiration_times:
                data['access_token_expiration'] = access_token_expiration
                data['refresh_token_expiration'] = refresh_token_expiration

            serializer = serializer_class(
                instance=data,
                context=self.get_serializer_context(),
            )
        elif self.token:
            serializer = serializer_class(
                instance=self.token,
                context=self.get_serializer_context(),
            )

        else:
            return Response(status=status.HTTP_204_NO_CONTENT)

        response = Response(serializer.data, status=status.HTTP_200_OK)
        if getattr(settings, 'REST_USE_JWT', False):
            from dj_rest_auth.jwt_auth import set_jwt_cookies
            set_jwt_cookies(response, self.access_token, self.refresh_token)

        return response


# 소셜 로그인
BASE_URL = 'http://15.165.19.180:8000/api/v1/accounts/rest-auth/'
KAKAO_CALLBACK_URI = BASE_URL + 'kakao/callback/'
NAVER_CALLBACK_URI = BASE_URL + 'naver/callback/'
GOOGLE_CALLBACK_URI = BASE_URL + 'google/callback/'
GITHUB_CALLBACK_URI = BASE_URL + 'github/callback/'


class KakaoLogin(SocialLoginView2):
    adapter_class = KakaoOAuth2Adapter
    callbakc_url = KAKAO_CALLBACK_URI
    client_class = OAuth2Client
    serializer_class = SocialLoginSerializer2


class NaverLogin(SocialLoginView2):
    adapter_class = NaverOAuth2Adapter
    callback_url = NAVER_CALLBACK_URI
    client_class = OAuth2Client
    serializer_class = SocialLoginSerializer2


class GithubLogin(SocialLoginView2):
    adapter_class = GitHubOAuth2Adapter
    callback_url = GITHUB_CALLBACK_URI
    client_class = OAuth2Client
    serializer_class = SocialLoginSerializer2


class GoogleLogin(SocialLoginView2):
    adapter_class = GoogleOAuth2Adapter
    callback_url = GOOGLE_CALLBACK_URI
    client_class = OAuth2Client
    serializer_class = SocialLoginSerializer2


class JWTSerializer2(JWTSerializer):
    def get_user(self, obj):
        rest_auth_serializers = getattr(settings, 'REST_AUTH_SERIALIZERS', {})
        JWTUserDetailsSerializer = import_string(
            rest_auth_serializers.get(
                'USER_DETAILS_SERIALIZER',
                'accounts.serializers.UserDetailsSerializer2',
            ),
        )

        user_data = JWTUserDetailsSerializer(
            obj['user'], context=self.context).data
        return user_data
