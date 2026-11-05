import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Trash2, ArrowDownRight, ArrowUpRight, Filter } from 'lucide-react';

export default function FilteredTransactionList({ refreshTrigger }) {
  const [transactions, setTransactions] = useState([]);
  const [typeFilter, setTypeFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  const fetchTransactions = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        params: {}
      };

      if (typeFilter !== 'All') config.params.type = typeFilter;
      if (categoryFilter !== 'All') config.params.category = categoryFilter;

      const { data } = await axios.get('http://localhost:5000/api/transactions', config);
      setTransactions(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch transactions');
    }
  };

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user, typeFilter, categoryFilter, refreshTrigger]);

  const handleDelete = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.delete(`http://localhost:5000/api/transactions/${id}`, config);
      setTransactions(transactions.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete transaction');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-lg font-bold text-slate-800">Transaction History & Filters</h3>
        
        {/* Filters UI */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter size={16} className="text-slate-400" />
          <select 
            value={typeFilter} 
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-2.5 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
          >
            <option value="All">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-2.5 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
          >
            <option value="All">All Categories</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Salary">Salary</option>
            <option value="Utilities">Utilities</option>
          </select>
        </div>
      </div>

      {error && <div className="bg-rose-50 text-rose-600 p-3 rounded-lg text-sm mb-4">{error}</div>}
      
      {transactions.length === 0 ? (
        <p className="text-slate-500 text-sm">No matching transactions found.</p>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          {transactions.map((t) => (
            <div 
              key={t._id} 
              className="flex items-center justify-between p-3.5 rounded-lg border border-slate-100 bg-slate-50 hover:bg-slate-100/60 transition"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${t.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                  {t.type === 'income' ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm">{t.text}</h4>
                  <p className="text-xs text-slate-500">
                    {t.category} • {new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium' }).format(new Date(t.date))}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`font-bold text-sm ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {t.type === 'income' ? '+' : '-'}₹{Math.abs(t.amount).toLocaleString('en-IN')}
                </span>
                <button 
                  onClick={() => handleDelete(t._id)} 
                  className="text-slate-400 hover:text-rose-600 transition p-1"
                  title="Delete Transaction"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}