from django.contrib import admin
from django.urls import path,include

""" from appAPI.views import getTasks,alterTasks,createTasks,deleteAll,toggleStatus,countPendingTask
from appAPI.views import createCategory, deleteCategory, getCategories """

from appAPI.views import CategoryView,TasksView,countPendingTask,deleteAll,toggleStatus
from rest_framework.routers import DefaultRouter
from appAPI import views


router = DefaultRouter()
router.register('category', CategoryView,basename='category')
router.register('tasks', TasksView,basename='tasks')


urlpatterns = [


    path('', include(router.urls)),
    path('deleteall/<int:pk>/',deleteAll),
     path('countpendingtasks/<int:pk>/',countPendingTask),
     path('togglestatus/<int:pk>/',toggleStatus),



    
]