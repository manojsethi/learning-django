from rest_framework.decorators import api_view
from rest_framework import status as httpStatus
from rest_framework.response import Response
from .serializers import CreateTaskSerializer, TaskSerializer
from .models import Task


@api_view(['GET'])
def get_all_tasks(request):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data, status=httpStatus.HTTP_200_OK)

@api_view(['POST'])
def create_task(request):
    taskData = request.data
    serializer = CreateTaskSerializer(data=taskData)
    if(serializer.is_valid()):
        return Response(serializer.data, status=httpStatus.HTTP_200_OK)
    return Response(serializer.errors, status=httpStatus.HTTP_400_BAD_REQUEST)
    