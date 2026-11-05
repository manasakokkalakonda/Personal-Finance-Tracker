import React, { useState } from 'react';
import { LayoutDashboard, Receipt, PieChart, Wallet, LogOut, Sun, Moon, PlusCircle } from 'lucide-react';

export default function Layout({ user, logout, children, activeTab, setActiveTab }) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-800'}`}>
      {/* Sidebar */}
      <aside className={`w-64 border-r p-6 flex flex-col justify-between hidden md:flex ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-xl text-white font-bold text-xl">₹</div>
            <h1 className="font-bold text-xl tracking-tight">Financely</h1>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'transactions', label: 'Transactions', icon: Receipt },
              { id: 'analytics', label: 'Analytics', icon: PieChart },
              { id: 'budgets', label: 'Budgets', icon: Wallet },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                      : darkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  <Icon size={20} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <button 
          onClick={logout} 
          className="flex items-center gap-3 px-4 py-3 text-rose-600 hover:bg-rose-50 rounded-xl transition font-medium"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className={`h-16 px-6 border-b flex items-center justify-between ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <div className="font-semibold text-lg">Overview</div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg border ${darkMode ? 'border-slate-700 text-yellow-400' : 'border-slate-200 text-slate-600'}`}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center text-sm">
                {user?.name?.[0] || 'U'}
              </div>
              <span className="font-medium text-sm hidden sm:inline">{user?.name}</span>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-6 overflow-y-auto flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}