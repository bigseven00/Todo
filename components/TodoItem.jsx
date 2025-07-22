"use client";
import { useState } from "react";
import { Edit2, Save, Trash2, CheckCircle, Circle } from "lucide-react";

export default function TodoItem({
  task,
  completed,
  onDelete,
  onEdit,
  onToggleComplete,
  isDisabled,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleSave = () => {
    if (editedTask.trim()) {
      onEdit(editedTask);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center flex-grow">
        <button
          onClick={onToggleComplete}
          className="mr-2"
          disabled={isDisabled}
          aria-label="Toggle completion"
        >
          {completed ? (
            <CheckCircle size={20} className="text-green-500" />
          ) : (
            <Circle size={20} />
          )}
        </button>
        {isEditing ? (
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={isDisabled}
            onKeyPress={(e) => e.key === "Enter" && handleSave()}
          />
        ) : (
          <span
            className={`text-lg ${
              completed ? "line-through text-gray-500" : ""
            }`}
          >
            {task}
          </span>
        )}
      </div>
      <div className="flex space-x-2">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="text-green-500 hover:text-green-700 disabled:text-gray-400"
            disabled={isDisabled}
          >
            <Save size={20} />
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-700 disabled:text-gray-400"
            disabled={isDisabled}
          >
            <Edit2 size={20} />
          </button>
        )}
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 disabled:text-gray-400"
          disabled={isDisabled}
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}