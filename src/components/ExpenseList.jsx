// src/components/ExpenseList.jsx
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import ExpenseItem from './ExpenseItem';

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const { user } = useContext(AuthContext);

  // Fetch expenses when the user logs in
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/expenses`);
        setExpenses(response.data);
      } catch (error) {
        if (error.response?.status !== 401) {
          console.error("Error fetching expenses:", error);
        }
      }
    };

    if (user) {
      fetchExpenses();
    } else {
      setExpenses([]); 
    }
  }, [user]);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/expenses`, {
        description,
        amount: parseFloat(amount),
        category,
      });
      setExpenses([response.data, ...expenses]);
      setDescription('');
      setAmount('');
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/expenses/${id}`);
      setExpenses(expenses.filter(exp => exp._id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const totalBalance = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const formattedTotal = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(totalBalance);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Expense Tracker</h2>
      <p className="text-gray-600">Your Current Balance:</p>
      <h3 className={`text-3xl font-bold mb-4 ${totalBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {formattedTotal}
      </h3>
      
      <form onSubmit={handleAddExpense} className="mb-4 border-t pt-4">
        <h4 className="font-semibold mb-2">Add New Transaction</h4>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700"
            required
          />
          <input
            type="number"
            placeholder="Amount (e.g., -50000 for expense)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700"
            required
          />
        </div>
        <div className="mt-4">
           <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
            >
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Income">Income</option>
              <option value="General">General</option>
           </select>
        </div>
        <button type="submit" className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Add Transaction
        </button>
      </form>

      <h4 className="font-semibold mt-6 border-t pt-4">History</h4>
      <ul>
        {expenses.length > 0 ? (
          expenses.map(expense => (
            <ExpenseItem key={expense._id} expense={expense} onDelete={handleDeleteExpense} />
          ))
        ) : (
          <p className="text-gray-500 text-center mt-2">No transactions yet.</p>
        )}
      </ul>
    </div>
  );
}

export default ExpenseList;