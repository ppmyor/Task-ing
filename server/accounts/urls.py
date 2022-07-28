from django.urls import path, include
from . import views
from django.conf.urls import url

urlpatterns =[
    path('signup/', views.CreateUserViewSet.as_view()),
 ]

