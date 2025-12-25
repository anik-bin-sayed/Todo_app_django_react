import axios from "axios";
import React, { useEffect, useState } from "react";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const API_URL = "http://127.0.0.1:8000/api/todos/";

  const fetchTodo = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (error) {
      console.error("Error to fetch todos", error);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      setIsloading(true);
      await axios.post(API_URL, {
        title: title,
        description: description,
      });

      setTitle("");
      setDescription("");
      fetchTodo();
    } catch (error) {
      console.error("Error adding todo", error);
    } finally {
      setIsloading(false);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/delete/`);
      fetchTodo();
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  };

  const toggleComplete = async (todo, id) => {
    try {
      await axios.patch(`${API_URL}${id}/`, {
        is_completed: !todo.is_completed,
      });
      fetchTodo();
    } catch (error) {
      console.error("Error updating todo", error);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex py-4 justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Todo App
        </h1>

        <form onSubmit={handleOnSubmit} className="flex flex-col gap-2 mb-4">
          <input
            type="text"
            placeholder="Todo title"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="Todo description (optional)"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Todo"}
          </button>
        </form>

        <ul className="space-y-3">
          {todos.length === 0 && (
            <p className="text-center text-gray-500">No todos yet</p>
          )}

          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-50 border rounded-lg px-3 py-2"
            >
              <div>
                <p
                  className={`font-medium ${
                    todo.is_completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {todo.title}
                </p>
                {todo.description && (
                  <p className="text-sm text-gray-500">{todo.description}</p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleComplete(todo, todo.id)}
                  className="text-sm text-green-600 hover:underline cursor-pointer"
                >
                  {todo.is_completed ? "Undo" : "Done"}
                </button>

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-sm text-red-600 hover:underline cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
          
        </ul>
      </div>
    </div>
  );
};

export default Todo;
