from rest_auth.registration.views import SocialLoginView
from .serializers import SocialLoginSerializer2, CreateUserSerializer
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.kakao.views import KakaoOAuth2Adapter
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
from django.conf import settings
from django.utils import timezone
from rest_framework.response import Response
from rest_framework import status, generics

User = get_user_model()


class CreateUserViewSet(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = CreateUserSerializer
    # permission_classes = (IsLogoutUser,)


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

        is_profile = Profile.objects.filter(user=self.user)
        if is_profile.count() == 0:
            Profile.objects.create(user=self.user)
        return response


# 소셜 로그인
BASE_URL = 'http://localhost:8000/api/v1/accounts/rest-auth/'
GOOGLE_CALLBACK_URI = BASE_URL + 'google/'
FACEBOOK_CALLBACK_URI = BASE_URL + 'facebook/'
GITHUB_CALLBACK_URI = BASE_URL + 'github/'


class GoogleLogin(SocialLoginView2):
    adapter_class = GoogleOAuth2Adapter
    callback_url = GOOGLE_CALLBACK_URI
    client_class = OAuth2Client
    serializer_class = SocialLoginSerializer2


class KakaoLogin(SocialLoginView2):
    adapter_class = KakaoOAuth2Adapter
    client_class = OAuth2Client
    serializer_class = SocialLoginSerializer2


class FacebookLogin(SocialLoginView2):
    adapter_class = FacebookOAuth2Adapter
    client_class = OAuth2Client
    callback_url = FACEBOOK_CALLBACK_URI
    serializer_class = SocialLoginSerializer2


class GithubLogin(SocialLoginView2):
    adapter_class = GitHubOAuth2Adapter
    callback_url = GITHUB_CALLBACK_URI
    client_class = OAuth2Client
    serializer_class = SocialLoginSerializer2