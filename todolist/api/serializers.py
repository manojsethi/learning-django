from rest_framework import serializers
from .models import Task

class CreateTaskSerializer (serializers.ModelSerializer):
    class Meta:
        model= Task
        fields= ['title']

class TaskSerializer (serializers.ModelSerializer):
    class Meta:
        model= Task
        fields= '__all__'