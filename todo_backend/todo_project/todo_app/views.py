from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Todo
from .serializers import TodoSerializer

# Create your views here.

class TodoListCreateView(APIView):
    def get(self, request):
        todos = Todo.objects.all()
        serializer = TodoSerializer(todos, many = True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TodoSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=404)


class TodoDeleteView(APIView):
    def delete(self, request, id):
        todo = Todo.objects.get(id = id)
        todo.delete()
        return Response(status=204)


class TodoUpdateView(APIView):
    def patch(self, request, id):
        try:
            todo = Todo.objects.get(id = id)
        except Todo.DoesNotExist:
            return Response({'Error': 'Todo not found'}, status=404)
        todo.is_completed = request.data.get('is_completed', todo.is_completed)
        todo.save()
        serializer = TodoSerializer(todo)
        return Response(serializer.data)













