import React from 'react';
import { LayoutDashboard, Wallet, PieChart, LogOut } from 'lucide-react';

export default function WireframeLayout() {
  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar Wireframe */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col p-6">
        <h2 className="text-xl font-bold text-indigo-600 mb-8">FinanceTracker</h2>
        <nav className="space-y-4 flex-1">
          <a href="#" className="flex items-center gap-3 text-indigo-600 font-medium bg-indigo-50 p-2.5 rounded-lg">
            <LayoutDashboard size={20} /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 text-slate-600 hover:bg-slate-50 p-2.5 rounded-lg">
            <Wallet size={20} /> Transactions
          </a>
          <a href="#" className="flex items-center gap-3 text-slate-600 hover:bg-slate-50 p-2.5 rounded-lg">
            <PieChart size={20} /> Analytics
          </a>
        </nav>
        <button className="flex items-center gap-3 text-rose-600 hover:bg-rose-50 p-2.5 rounded-lg mt-auto">
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main Content Wireframe */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Dashboard Wireframe</h1>
            <p className="text-slate-500 text-sm">Day 2 UI Layout Structure</p>
          </div>
          <div className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Add Transaction
          </div>
        </header>

        {/* Metric Cards Wireframe */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500">Total Income</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">₹0.00</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500">Total Expense</p>
            <p className="text-2xl font-bold text-rose-600 mt-1">₹0.00</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500">Balance</p>
            <p className="text-2xl font-bold text-indigo-600 mt-1">₹0.00</p>
          </div>
        </div>
      </main>
    </div>
  );
}