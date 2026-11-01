import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';
import { loginUser } from '../api/authApi';
import { useAuth } from '../context/authContext';

const SignIn = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
   const [formData, setFormData] = useState({
      useremail: '',
      password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleLogin =async (e) => {
    e.preventDefault();
    const {useremail, password} = formData;
    setError(null);
    setLoading(true);
        try {
          const res = await loginUser({email: useremail, password });
          const user = res.data?.user ?? null;
          const token = res.data?.token ?? null;
          if (user || token) {
            setAuth(user, token);
          }
          navigate('/');
        } catch (err) {
          setError(err.response?.data?.message || err.message || 'Login failed');
        } finally {
          setLoading(false);
        }

  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-black font-sans text-white overflow-hidden">
      {/* Immersive Animated Background */}
      <div className="cosmic-auth-bg"></div>
      <div className="auth-stars"></div>

      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

      <div className="relative z-10 w-full max-w-lg px-6 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 mb-6 shadow-[0_0_20px_rgba(127,19,236,0.3)]">
            <span className="material-symbols-outlined text-4xl text-[#c88cff]">local_parking</span>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight mb-3">Welcome Back</h1>
          <p className="text-lg text-gray-400">Access your personalized parking universe.</p>
        </div>

        <div className="glass-panel p-8 sm:p-10 ">
          {error && (
            <div className="mb-4 text-sm text-red-400 bg-red-900/20 p-3 rounded">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div className="premium-input-group">
              <input
              name="useremail"
                className="premium-input"
                placeholder="Email"
                type="email"
                value={formData.useremail}
                onChange={handleChange}
                required
              />
              <span className="material-symbols-outlined input-icon">mail</span>
            </div>

            <div className="premium-input-group">
              <input
               name="password"
                className="premium-input"
                placeholder="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required  
              />
              <span className="material-symbols-outlined input-icon">lock</span>
            </div>

            <button className="portal-btn-premium mt-6" type="submit">
              <span>
                  Sign In
                <span className="material-symbols-outlined">rocket_launch</span>
              </span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-gray-400">
              New to the station?{' '}
              <Link className="font-semibold text-white hover:text-pink-400 transition-colors" to="/signup">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
