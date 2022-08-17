
from django.db import models

# Create your models here.
class Categories(models.Model):
    categoryName = models.CharField(max_length=15)

    def __str__(self):
        return self.categoryName


class TaskDetails(models.Model):
    taskName = models.CharField(max_length=30)
    completed = models.BooleanField(default=False)
    category = models.ForeignKey(Categories,on_delete=models.CASCADE,related_name='tasks')
   
    def __str__(self):
        return self.taskName