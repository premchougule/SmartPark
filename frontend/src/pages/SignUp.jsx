import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import './Auth.css';
import { registerUser } from '../api/authApi';
import { useAuth } from '../context/authContext.jsx';

const SignUp = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    useremail: '',
    password: '',
    cpassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    const { username, useremail, password, cpassword } = formData;
    if (password !== cpassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const res = await registerUser({ username, email: useremail, password });
      const user = res.data?.user ?? null;
      const token = res.data?.token ?? null;
      if (user || token) {
        setAuth(user, token);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-black font-sans text-white overflow-hidden">
      {/* Immersive Animated Background */}
      <div className="cosmic-auth-bg"></div>
      <div className="auth-stars"></div>

      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

      <div className="relative z-10 w-full max-w-xl px-6 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 mb-4 shadow-[0_0_20px_rgba(236,72,153,0.3)]">
            <span className="material-symbols-outlined text-4xl text-[#ec4899]">public</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2">Create Your Universe</h1>
          <p className="text-lg text-gray-400">Join ParkSmart and build your new identity.</p>
        </div>

        <div className="glass-panel p-8 sm:p-10">
          {error && (
            <div className="mb-4 text-sm text-red-400 bg-red-900/20 p-3 rounded">
              {error}
            </div>
          )}
          <form onSubmit={handleRegister}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
              <div className="premium-input-group">
                <input
                  className="premium-input"
                  placeholder="Username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <span className="material-symbols-outlined input-icon">person</span>
              </div>

              <div className="premium-input-group">
                <input
                  className="premium-input"
                  placeholder="Email Address"
                  name="useremail"
                  type="email"
                  value={formData.useremail}
                  onChange={handleChange}
                  required
                />
                <span className="material-symbols-outlined input-icon">mail</span>
              </div>

              <div className="premium-input-group">
                <input
                  className="premium-input"
                  placeholder="Enter Your Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span className="material-symbols-outlined input-icon">lock</span>
              </div>

              <div className="premium-input-group">
                <input
                  className="premium-input"
                  placeholder="Confirm Your Password"
                  name="cpassword"
                  type="password"
                  value={formData.cpassword}
                  onChange={handleChange}
                  required
                />
                <span className="material-symbols-outlined input-icon">verified_user</span>
              </div>
            </div>

            <button className="portal-btn-premium mt-4" type="submit" disabled={loading}>
              <span>
                {loading ? 'Creating…' : 'Create Account'}
                <span className="material-symbols-outlined">add_circle</span>
              </span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-gray-400">
              Already a member?{' '}
              <Link className="font-semibold text-white hover:text-purple-400 transition-colors" to="/signin">
                Log in to base
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
