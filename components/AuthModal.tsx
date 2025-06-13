import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import FormField from './FormField';

interface AuthModalProps {
  onClose: () => void;
}

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const SpinnerIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`animate-spin -ml-1 mr-3 h-5 w-5 ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);


const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const { login, signup, isLoadingAuth, authError, clearAuthError } = useContext(AuthContext);

  useEffect(() => {
    // Clear form fields and errors when modal is opened or mode changes
    setUsername('');
    setEmail('');
    setPhone('');
    setPassword('');
    setConfirmPassword('');
    clearAuthError();
    setLocalError(null);
  }, [mode, clearAuthError]);
  
  // Clear authError when modal is closed (unmounted)
   useEffect(() => {
    return () => {
      clearAuthError();
    };
  }, [clearAuthError]);


  const handleSwitchMode = () => {
    setMode(prevMode => (prevMode === 'login' ? 'signup' : 'login'));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearAuthError();
    setLocalError(null);

    if (mode === 'login') {
      if (!username || !password) {
        setLocalError('Please enter both username and password.');
        return;
      }
      try {
        await login(username, password);
        // onClose will be handled by AuthContext or App.tsx if login is successful
      } catch (err) {
        // AuthContext should set authError
      }
    } else { // signup mode
      if (!username || !email || !phone || !password || !confirmPassword) {
        setLocalError('Please fill in all fields for signup.');
        return;
      }
      if (password !== confirmPassword) {
        setLocalError('Passwords do not match.');
        return;
      }
      if (password.length < 6) {
        setLocalError('Password must be at least 6 characters long.');
        return;
      }
      try {
        await signup(username, email, phone, password);
        // onClose will be handled by AuthContext or App.tsx if signup is successful
      } catch (err) {
        // AuthContext should set authError
      }
    }
  };

  const displayError = authError || localError;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-[100] transition-opacity duration-300 ease-in-out" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="auth-modal-title"
    >
      <div className="bg-brand-light p-6 sm:p-8 rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto relative transform transition-all duration-300 ease-in-out scale-100">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-brand-dark hover:text-brand-secondary transition-colors p-1 rounded-full hover:bg-brand-accent"
          aria-label="Close authentication modal"
        >
          <CloseIcon className="w-5 h-5" />
        </button>
        
        <h2 id="auth-modal-title" className="text-2xl sm:text-3xl font-bold text-brand-primary font-serif mb-6 text-center">
          {mode === 'login' ? 'Welcome Back!' : 'Create Account'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <FormField
            id="username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
            required
            error={displayError && displayError.toLowerCase().includes('username') ? displayError : null}
          />

          {mode === 'signup' && (
            <>
              <FormField
                id="email"
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                error={displayError && displayError.toLowerCase().includes('email') ? displayError : null}
              />
              <FormField
                id="phone"
                label="Phone Number"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g., (123) 456-7890"
                required
                error={displayError && displayError.toLowerCase().includes('phone') ? displayError : null}
              />
            </>
          )}

          <FormField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={mode === 'login' ? 'Enter your password' : 'Create a strong password'}
            required
            error={displayError && (displayError.toLowerCase().includes('password') || displayError.toLowerCase().includes('credential')) && !displayError.toLowerCase().includes('match') ? displayError : null}
          />

          {mode === 'signup' && (
            <FormField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              required
              error={displayError && displayError.toLowerCase().includes('match') ? displayError : null}
            />
          )}

          {displayError && (
             <p className="text-xs text-red-600 bg-red-100 p-2 rounded-md text-center">
                {displayError}
             </p>
          )}
          
          <button
            type="submit"
            disabled={isLoadingAuth}
            className="w-full bg-brand-secondary hover:bg-opacity-80 text-white font-semibold py-3 px-6 rounded-lg text-lg transition-colors shadow-md flex items-center justify-center disabled:bg-opacity-60"
          >
            {isLoadingAuth && <SpinnerIcon className="text-white" />}
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-brand-dark">
          {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={handleSwitchMode}
            className="font-semibold text-brand-secondary hover:underline focus:outline-none"
            disabled={isLoadingAuth}
          >
            {mode === 'login' ? 'Sign Up' : 'Login'}
          </button>
        </p>
         {mode === 'login' && (
            <p className="text-xs text-center mt-3 text-gray-500">
                Hint: Try user: <code className="bg-gray-200 px-1 rounded">user</code>, password: <code className="bg-gray-200 px-1 rounded">user123</code>
            </p>
        )}

      </div>
    </div>
  );
};

export default AuthModal;
