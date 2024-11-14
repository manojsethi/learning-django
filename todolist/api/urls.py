from django.urls import path
from .views import get_all_tasks, create_task

urlpatterns= [
    path('', get_all_tasks),
    path('create', create_task )
]