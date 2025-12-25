from django.urls import path

from .views import (
    TodoListCreateView,
    TodoDeleteView,
    TodoUpdateView
)

urlpatterns = [
    path('todos/', TodoListCreateView.as_view(), name='create_todo'),
    path('todos/<int:id>/delete/', TodoDeleteView.as_view(), name='delete_view'),
    path('todos/<int:id>/', TodoUpdateView.as_view(), name='todo-update'),
]
