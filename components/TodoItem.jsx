export default function TodoItem({ task, onDelete }) {
    return (
      <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <span className="text-lg">{task}</span>
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 font-medium px-3 py-1 rounded hover:bg-red-50 transition"
        >
          Delete
        </button>
      </div>
    );
  }