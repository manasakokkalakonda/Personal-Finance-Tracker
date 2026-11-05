import React, { useContext, useState } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Login from './components/Login';
import Register from './components/Register';
import AddTransactionForm from './components/AddTransactionForm';
import FilteredTransactionList from './components/FilteredTransactionList';
import FinanceCharts from './components/FinanceCharts';
import BudgetStats from './components/BudgetStats';

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleTransactionAdded = () => {
    setRefreshTrigger(!refreshTrigger);
  };

  return (
    <Layout user={user} logout={logout} activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Metric Summary Cards */}
        <BudgetStats refreshTrigger={refreshTrigger} />

        {/* Analytics Charts */}
        <FinanceCharts refreshTrigger={refreshTrigger} />

        {/* Main Grid: Form & List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <AddTransactionForm onTransactionAdded={handleTransactionAdded} />
          </div>
          <div className="lg:col-span-2">
            <FilteredTransactionList refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

function AuthContainer() {
  const [isRegister, setIsRegister] = useState(false);
  const toggleView = () => setIsRegister(!isRegister);

  return isRegister ? <Register toggleView={toggleView} /> : <Login toggleView={toggleView} />;
}

function MainApp() {
  const { user } = useContext(AuthContext);
  return user ? <Dashboard /> : <AuthContainer />;
}

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <MainApp />
    </AuthProvider>
  );
}