import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6'];

export default function FinanceCharts({ refreshTrigger }) {
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
        setError('Failed to load live chart data');
      }
    };
    if (user) fetchTransactions();
  }, [user, refreshTrigger]);

  // Aggregate Category-wise Expenses for Pie Chart
  const expenseData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => {
      const found = acc.find(item => item.name === curr.category);
      if (found) {
        found.value += curr.amount;
      } else {
        acc.push({ name: curr.category, value: curr.amount });
      }
      return acc;
    }, []);

  // Aggregate Monthly Trends for Bar Chart
  const monthlyDataMap = transactions.reduce((acc, curr) => {
    const month = new Date(curr.date).toLocaleString('default', { month: 'short', year: '2-digit' });
    if (!acc[month]) acc[month] = { month, income: 0, expense: 0 };
    if (curr.type === 'income') acc[month].income += curr.amount;
    else acc[month].expense += curr.amount;
    return acc;
  }, {});

  const barData = Object.values(monthlyDataMap);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Category Pie Chart */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Expenses by Category (Live)</h3>
        {error && <p className="text-rose-600 text-sm">{error}</p>}
        {expenseData.length === 0 ? (
          <p className="text-slate-400 text-sm h-64 flex items-center justify-center">Add expenses to view live category breakdown.</p>
        ) : (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={expenseData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Monthly Trends Bar Chart */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Monthly Trends (Live)</h3>
        {barData.length === 0 ? (
          <p className="text-slate-400 text-sm h-64 flex items-center justify-center">Add transactions to view live trends.</p>
        ) : (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#10b981" name="Income" />
                <Bar dataKey="expense" fill="#f43f5e" name="Expense" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}