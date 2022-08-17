from django.shortcuts import render

from rest_framework import status,viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view

from appAPI.serializers import TaskSerializer
from appAPI.models import TaskDetails
from appAPI.serializers import TaskStatusSerializer
from appAPI.models import Categories
from appAPI.serializers import CategorySerializer
# Create your views here.



class CategoryView(viewsets.ModelViewSet):
    queryset = Categories.objects.all()
    serializer_class = CategorySerializer

class TasksView(viewsets.ModelViewSet):
    queryset = TaskDetails.objects.all()
    serializer_class = TaskSerializer

@api_view(['GET'])
def countPendingTask(request,pk):
    count = TaskDetails.objects.filter(category=pk,completed =False).count()
    print('count',count)
    return Response({"data":count},status=status.HTTP_200_OK)

@api_view(['DELETE'])
def deleteAll(request,pk):
    TaskDetails.objects.filter(category=pk).delete()
    return Response ({'message':"All Tasks are deleted"})



@api_view(['PATCH'])
def toggleStatus(request,pk):
    try:
        obj = TaskDetails.objects.get(pk=pk)
    except:
        return Response({'error':'Id not found in dB'},status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PATCH':
        data = request.data
        serializer = TaskStatusSerializer(obj,data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"Status updated"},status=status.HTTP_200_OK)
        return Response({'error':serializer.errors},status=status.HTTP_400_BAD_REQUEST)



"""   

 path('gettasks/<int:fkid>/',getTasks),
    path('altertask/<int:pk>/',alterTasks),
    path('createtask/<int:pk>/',createTasks),
    path('deleteall/',deleteAll),
    path('togglestatus/<int:pk>/',toggleStatus),
    path('countpendingtasks/',countPendingTask),
    
    path('getCategories/',getCategories),
    path('deleteCategory/<int:pk>/',deleteCategory),
    path('createCategory/',createCategory), 

@api_view(['GET'])
def getTasks(request,fkid):
   # print('ans',Categories.objects.filter(id=fkid))
    obj = TaskDetails.objects.filter(category_id=fkid).values()
    serializer = TaskSerializer(obj,many=True)  
    return Response(serializer.data,status=status.HTTP_200_OK)


@api_view(['POST'])
def createTasks(request,pk):
    data = request.data
 
  #  id=Categories.objects.filter(pk=pk).values()[0]['id']
    data['category'] = pk
 
    serializer = TaskSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_200_OK)
    return Response({'error':serializer.errors},status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT','DELETE'])
def alterTasks(request,pk):
    try:
        obj = TaskDetails.objects.get(pk=pk)
    except:
        return Response({'error':'Id not found in dB'},status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PUT':
        data = request.data
        serializer = TaskSerializer(obj,data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"Task updated"},status=status.HTTP_200_OK)
        return Response({'error':serializer.errors},status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        obj.delete()
        return Response({'message':"Task deleted Successfully"},status=status.HTTP_200_OK)
    
    return Response({"error":"error in methods"})


@api_view(['DELETE'])
def deleteAll(request):
    TaskDetails.objects.all().delete()
    return Response ({'message':"All Tasks are deleted"})

@api_view(['PATCH'])
def toggleStatus(request,pk):
    try:
        obj = TaskDetails.objects.get(pk=pk)
    except:
        return Response({'error':'Id not found in dB'},status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PATCH':
        data = request.data
        serializer = TaskStatusSerializer(obj,data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"Status updated"},status=status.HTTP_200_OK)
        return Response({'error':serializer.errors},status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def countPendingTask(request):
    count = TaskDetails.objects.filter(completed =False).count()
    return Response({"data":count},status=status.HTTP_200_OK)



@api_view(['GET'])
def getCategories(request):
    obj = Categories.objects.all()
    serializer = CategorySerializer(obj,many=True)  
    return Response(serializer.data,status=status.HTTP_200_OK)


@api_view(['POST'])
def createCategory(request):
    data = request.data
    serializer = CategorySerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_200_OK)
    return Response({'error':serializer.errors},status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteCategory(request,pk):
    try:
        obj = Categories.objects.get(pk=pk)
    except:
        return Response({'error':'Id not found in dB'},status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        obj.delete()
        return Response({'message':"Category deleted Successfully"},status=status.HTTP_200_OK)
    
    return Response({"error":"error in methods"})
"""