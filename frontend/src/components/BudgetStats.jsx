import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Wallet, ArrowUpCircle, ArrowDownCircle, DollarSign } from 'lucide-react';

export default function BudgetStats({ refreshTrigger }) {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` },
        };
        const { data } = await axios.get('http://localhost:5000/api/transactions', config);
        setTransactions(data);
      } catch (err) {
        setError('Failed to load summary stats');
      }
    };
    if (user) fetchTransactions();
  }, [user, refreshTrigger]);

  // Calculate totals: Income, Expense, Balance[cite: 4]
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const netBalance = totalIncome - totalExpense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {error && <p className="text-rose-600 text-sm col-span-3">{error}</p>}
      
      {/* Total Income Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Total Income</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">₹{totalIncome.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-emerald-100 text-emerald-600 p-3 rounded-xl">
          <ArrowUpCircle size={24} />
        </div>
      </div>

      {/* Total Expense Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Total Expense</p>
          <p className="text-2xl font-bold text-rose-600 mt-1">₹{totalExpense.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-rose-100 text-rose-600 p-3 rounded-xl">
          <ArrowDownCircle size={24} />
        </div>
      </div>

      {/* Current Balance Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Current Balance</p>
          <p className={`text-2xl font-bold mt-1 ${netBalance >= 0 ? 'text-indigo-600' : 'text-rose-600'}`}>
            ₹{netBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl">
          <Wallet size={24} />
        </div>
      </div>
    </div>
  );
}