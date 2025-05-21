import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSupabase } from '../context/SupabaseContext';
import { UserPlus, Loader, AlertCircle, ArrowLeft } from 'lucide-react';

const SignupScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { signUp } = useSupabase();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    // Validate password strength
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const { error, data } = await signUp(email, password);
      
      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
        // Automatically redirect to home after signup
        // Note: In a real app, you might want to verify email first
        setTimeout(() => navigate('/'), 2000);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Link 
        to="/" 
        className="inline-flex items-center text-primary-600 hover:text-primary-800 mb-6"
        aria-label="Back to home"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to News
      </Link>
      
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Create an Account</h1>
        
        {error && (
          <div className="bg-error-50 border border-error-200 rounded-md p-4 mb-6 flex items-start">
            <AlertCircle size={20} className="text-error-600 mr-2 flex-shrink-0 mt-1" />
            <p className="text-error-700">{error}</p>
          </div>
        )}
        
        {success && (
          <div className="bg-success-50 border border-success-200 rounded-md p-4 mb-6">
            <p className="text-success-700">
              Account created successfully! You'll be redirected automatically.
            </p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="email@example.com"
              required
              autoComplete="email"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="••••••••"
              required
              autoComplete="new-password"
            />
            <p className="text-sm text-gray-500 mt-1">
              Must be at least 6 characters long
            </p>
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-input"
              placeholder="••••••••"
              required
              autoComplete="new-password"
            />
          </div>
          
          <button
            type="submit"
            className="btn btn-primary w-full flex items-center justify-center"
            disabled={loading || success}
          >
            {loading ? (
              <>
                <Loader size={20} className="animate-spin mr-2" />
                Creating Account...
              </>
            ) : (
              <>
                <UserPlus size={20} className="mr-2" />
                Sign Up
              </>
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-primary-600 hover:text-primary-800 font-medium"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupScreen;