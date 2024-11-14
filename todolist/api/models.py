from django.db import models

class Task(models.Model):
    title = models.TextField(max_length=50)
    isCompleted = models.BooleanField()

    def __str__(self):
        return self.title
        