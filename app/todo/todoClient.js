"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import TodoTitle from "@/components/TodoTitle";
import TodoItem from "@/components/TodoItem";
import Popup from "@/components/Popup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TodoClient({ initialTodos, userId }) {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const addTodo = async () => {
    if (!newTodo.trim()) return;

    setIsLoading(true);
    const { data, error } = await supabase
      .from("todos")
      .insert([{ task: newTodo, user_id: userId, completed: false }])
      .select();

    if (error) {
      console.error("Error adding todo:", error);
      toast.error("Failed to add todo.");
    } else {
      setTodos([...todos, data[0]]);
      setNewTodo("");
      toast.success("Todo added successfully!");
    }
    setIsLoading(false);
  };

  const handleDelete = (todoId) => {
    setTodoToDelete(todoId);
    setPopupOpen(true);
  };

  const confirmDelete = async () => {
    if (todoToDelete === null) return;

    setIsLoading(true);
    const { error } = await supabase
      .from("todos")
      .delete()
      .eq("id", todoToDelete)
      .eq("user_id", userId);

    if (error) {
      console.error("Error deleting todo:", error);
      toast.error("Failed to delete todo.");
    } else {
      setTodos(todos.filter((todo) => todo.id !== todoToDelete));
      toast.success("Todo deleted successfully!");
    }
    setPopupOpen(false);
    setTodoToDelete(null);
    setIsLoading(false);
  };

  const handleEdit = async (index, newTask) => {
    const todo = todos[index];
    setIsLoading(true);
    const { error } = await supabase
      .from("todos")
      .update({ task: newTask })
      .eq("id", todo.id)
      .eq("user_id", userId);

    if (error) {
      console.error("Error editing todo:", error);
      toast.error("Failed to edit todo.");
    } else {
      const updatedTodos = [...todos];
      updatedTodos[index].task = newTask;
      setTodos(updatedTodos);
      toast.success("Todo updated successfully!");
    }
    setIsLoading(false);
  };

  const handleToggleComplete = async (todoId, currentStatus) => {
    setIsLoading(true);
    const { error } = await supabase
      .from("todos")
      .update({ completed: !currentStatus })
      .eq("id", todoId)
      .eq("user_id", userId);

    if (error) {
      console.error("Error toggling todo completion:", error);
      toast.error("Failed to update todo status.");
    } else {
      setTodos(
        todos.map((todo) =>
          todo.id === todoId ? { ...todo, completed: !currentStatus } : todo
        )
      );
      toast.success("Todo status updated!");
    }
    setIsLoading(false);
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
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
          disabled={isLoading}
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-6 py-3 rounded-r-lg hover:bg-blue-600 transition disabled:bg-blue-300"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Todo"}
        </button>
      </div>
      <div className="space-y-4">
        {todos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            task={todo.task}
            completed={todo.completed}
            onDelete={() => handleDelete(todo.id)}
            onEdit={(newTask) => handleEdit(index, newTask)}
            onToggleComplete={() =>
              handleToggleComplete(todo.id, todo.completed)
            }
            isDisabled={isLoading}
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
      <ToastContainer />
    </div>
  );
}