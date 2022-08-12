from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .serializers import TodoSerializer, PlanSerializer
from .models import Todo, Plan

class TodoViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    # permission_classes = []


class PlanViewSet(ModelViewSet):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer
    # permission_classes = []



     