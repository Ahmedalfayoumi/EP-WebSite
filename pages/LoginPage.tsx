
import React, { useState, useContext, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (authContext?.login(username, password)) {
      navigate('/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary">
      <div className="max-w-md w-full bg-card p-8 rounded-lg shadow-lg border border-border">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary">Dashboard Login</h1>
            <p className="text-foreground/70">Access your website control panel</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-foreground">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-background border border-input rounded-md shadow-sm placeholder-foreground/50 focus:outline-none focus:ring-ring focus:border-ring sm:text-sm"
              placeholder="admin"
            />
          </div>
          <div>
            <label htmlFor="password-input" className="block text-sm font-medium text-foreground">
              Password
            </label>
            <input
              id="password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-background border border-input rounded-md shadow-sm placeholder-foreground/50 focus:outline-none focus:ring-ring focus:border-ring sm:text-sm"
              placeholder="admin"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
            >
              Log in
            </button>
          </div>
        </form>
         <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-primary hover:underline">
                &larr; Back to Website
            </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
