from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views


router = DefaultRouter()
router.register('plan', views.PlanViewSet, basename='plan')
router.register('todo', views.TodoViewSet, basename='todo')


urlpatterns = router.urls + [
]