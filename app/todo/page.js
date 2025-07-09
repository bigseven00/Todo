"use client"
import { useState } from "react";
import TodoTitle from "@/components/TodoTitle";
import TodoItem from "@/components/TodoItem";
import Popup from "@/components/Popup";

export default function TodoPage() {
  const [todos, setTodos] = useState([
    "Wake Up early and Pray",
    "Do some exercise",
    "Brush and take your bath",
    "Eat Your Breakfast",
    "Go to work"
  ]);

  const [newTodo, setNewTodo] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo]);
      setNewTodo("");
    }
  };

  const confirmDelete = () => {
    const updatedTodos = todos.filter((_, index) => index !== todoToDelete);
    setTodos(updatedTodos);
    setPopupOpen(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-14">
      <TodoTitle />

      <div className="flex mb-8 mt-6">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-6 py-3 rounded-r-lg hover:bg-blue-600 transition"
        >
          Add Todo
        </button>
      </div>

      <div className="space-y-4">
        {todos.map((task, index) => (
          <TodoItem
            key={index}
            task={task}
            onDelete={() => {
              setTodoToDelete(index);
              setPopupOpen(true);
            }}
          />
        ))}
      </div>

      {popupOpen && (
        <Popup
          title="Are you sure you want to delete this todo?"
          closePopup={() => setPopupOpen(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}