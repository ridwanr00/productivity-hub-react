function ToDoItem({ text, onDelete, onComplete, isCompleted }) {
  return (
    <li className="flex items-center justify-between p-3 mb-2 bg-slate-50 rounded-lg shadow-sm">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={onComplete}
          className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className={`ml-3 text-lg ${isCompleted ? 'line-through text-gray-400' : 'text-gray-700'}`}>
          {text}
        </span>
      </div>
      <button 
        onClick={onDelete} 
        className="text-red-500 hover:text-red-700 font-semibold"
      >
        Delete
      </button>
    </li>
  );
}

export default ToDoItem;
