from rest_auth.registration.views import SocialLoginView
from .serializers import CreateUserSerializer
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model

from dj_rest_auth.registration.serializers import SocialLoginSerializer

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.kakao.views import KakaoOAuth2Adapter
from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
from allauth.socialaccount.providers.naver.views import NaverOAuth2Adapter
from django.conf import settings
from django.utils import timezone
from rest_framework.response import Response
from rest_framework import status, generics
from .serializers import UserLoginSerializer

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


# 소셜 로그인
BASE_URL = 'http://localhost:8000/api/v1/accounts/rest-auth/'
KAKAO_CALLBACK_URI = BASE_URL + 'kakao/'
NAVER_CALLBACK_URI = BASE_URL + 'naver/'
GOOGLE_CALLBACK_URI = BASE_URL + 'google/'
GITHUB_CALLBACK_URI = BASE_URL + 'github/'


class KakaoLogin(SocialLoginView):
    adapter_class = KakaoOAuth2Adapter
    callbakc_url = KAKAO_CALLBACK_URI
    client_class = OAuth2Client
    serializer_class = SocialLoginSerializer


class NaverLogin(SocialLoginView):
    adapter_class = NaverOAuth2Adapter
    callback_url = NAVER_CALLBACK_URI
    client_class = OAuth2Client
    serializer_class = SocialLoginSerializer


class GithubLogin(SocialLoginView):
    adapter_class = GitHubOAuth2Adapter
    callback_url = GITHUB_CALLBACK_URI
    client_class = OAuth2Client
    serializer_class = SocialLoginSerializer


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = GOOGLE_CALLBACK_URI
    client_class = OAuth2Client
    serializer_class = SocialLoginSerializer


