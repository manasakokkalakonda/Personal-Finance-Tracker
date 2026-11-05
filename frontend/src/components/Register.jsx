import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Register({ toggleView }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register account');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Create Account</h2>
        {error && <div className="bg-rose-50 text-rose-600 p-3 rounded-lg text-sm mb-4">{error}</div>}
        
        <div className="mb-4">
          <label className="block text-slate-600 text-sm font-medium mb-1">Full Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-slate-600 text-sm font-medium mb-1">Email Address</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-slate-600 text-sm font-medium mb-1">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition mb-4">
          Register
        </button>
        <p className="text-center text-sm text-slate-600">
          Already have an account?{' '}
          <button type="button" onClick={toggleView} className="text-indigo-600 font-medium hover:underline">
            Login here
          </button>
        </p>
      </form>
    </div>
  );
}