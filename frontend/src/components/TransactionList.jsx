import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Trash2, ArrowDownRight, ArrowUpRight } from 'lucide-react';

export default function TransactionList({ refreshTrigger }) {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  const fetchTransactions = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
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
  }, [user, refreshTrigger]);

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
      <h3 className="text-lg font-bold text-slate-800 mb-4">Transaction History</h3>
      {error && <div className="bg-rose-50 text-rose-600 p-3 rounded-lg text-sm mb-4">{error}</div>}
      
      {transactions.length === 0 ? (
        <p className="text-slate-500 text-sm">No transactions recorded yet.</p>
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
                  <p className="text-xs text-slate-500">{t.category} • {new Date(t.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`font-bold text-sm ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {t.type === 'income' ? '+' : '-'}₹{Math.abs(t.amount).toFixed(2)}
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