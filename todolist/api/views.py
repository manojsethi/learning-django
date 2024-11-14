from rest_framework.decorators import api_view
from rest_framework import status as httpStatus
from rest_framework.response import Response
from .serializers import CreateTaskSerializer, TaskSerializer
from .models import Task

@api_view(['GET'])
def get_all_tasks(request):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_task(request):
    taskData = request.data
    serializer = CreateTaskSerializer(data=taskData)
    if(serializer.is_valid()):
        serializer.save()
        return Response(serializer.data, status=httpStatus.HTTP_200_OK)
    return Response(serializer.errors, status=httpStatus.HTTP_400_BAD_REQUEST)

@api_view(['PUT','DELETE'])
def task_actions(request, id):
    try:
        foundTask = Task.objects.get(id=id)
    except:
        return Response(status=httpStatus.HTTP_400_BAD_REQUEST)
    
    if(request.method == 'PUT'):
        taskData = request.data
        serializer = TaskSerializer(foundTask, data=taskData)
        
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=httpStatus.HTTP_200_OK)
        return Response(serializer.errors, status=httpStatus.HTTP_400_BAD_REQUEST)
    
    elif(request.method =='DELETE'):
        Task.delete(foundTask)
        return Response(status=httpStatus.HTTP_200_OK)
    else:
        return Response(status=httpStatus.HTTP_405_METHOD_NOT_ALLOWED)

   