from django.urls import path
from .views import get_all_tasks, create_task, task_actions

urlpatterns= [
    path('', get_all_tasks),
    path('create', create_task),
    path('<int:id>', task_actions)
]