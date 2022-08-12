from django.urls import path, include
from . import views
from django.conf.urls import url

urlpatterns =[
    path('signup/', views.CreateUserViewSet.as_view()),

    path('rest-auth/kakao/', views.KakaoLogin.as_view(), name='kakao'),
    path('rest-auth/naver/', views.NaverLogin.as_view(), name='naver'),
    path('rest-auth/google/', views.GoogleLogin.as_view(), name='google'),
    path('rest-auth/github/', views.GithubLogin.as_view(), name='github'),
 ]