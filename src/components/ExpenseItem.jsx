function ExpenseItem({ expense, onDelete }) {
  const isExpense = expense.amount < 0;
  const amountColor = isExpense ? "text-red-500" : "text-green-600";

  const formattedAmount = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(Math.abs(expense.amount));

  return (
    <li className="flex items-center justify-between p-3 mb-2 bg-slate-50 rounded-lg shadow-sm">
      <div className="flex flex-col">
        <span className="font-semibold text-gray-800">
          {expense.description}
        </span>
        <span className="text-sm text-gray-500">{expense.category}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className={`font-bold text-lg ${amountColor}`}>
          {isExpense ? "-" : "+"} {formattedAmount}
        </span>
        <button
          onClick={() => onDelete(expense._id)}
          className="text-gray-400 hover:text-red-600 font-semibold"
        >
          &times;
        </button>
      </div>
    </li>
  );
}

export default ExpenseItem;