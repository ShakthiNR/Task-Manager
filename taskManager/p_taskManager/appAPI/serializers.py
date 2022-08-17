
from rest_framework import serializers

from appAPI.models import TaskDetails
from appAPI.models import Categories


class TaskSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = TaskDetails
        fields = '__all__'
    
    def validate(self,data):
        print('data',data)
        if len(str(data['taskName'])) > 30:
            raise serializers.ValidationError({"error":"Task Name should be less than 30 letters"})
        return data

  
class CategorySerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(read_only=True,many=True)

    class Meta:
        model = Categories
        fields = '__all__'
        depth=1
  
     

class TaskStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskDetails
        fields = ['completed']

