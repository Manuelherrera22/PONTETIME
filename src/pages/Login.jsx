import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;
            navigate('/');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <SEO title="Login | PonteTIME" />

            <div className="flex-grow flex items-center justify-center pt-24 pb-12 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md w-full bg-white p-10 md:p-12 shadow-2xl rounded-sm border border-gray-100"
                >
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-serif text-luxury-black mb-2">Welcome Back</h2>
                        <p className="text-gray-400 text-xs uppercase tracking-[0.2em]">Access your account</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 mb-6 text-sm text-center border border-red-100">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-gray-200 p-4 text-luxury-black focus:outline-none focus:border-luxury-gold transition-colors bg-gray-50 focus:bg-white text-sm"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">Password</label>
                                <a href="#" className="text-[10px] text-gray-400 hover:text-luxury-black transition-colors">Forgot?</a>
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-gray-200 p-4 text-luxury-black focus:outline-none focus:border-luxury-gold transition-colors bg-gray-50 focus:bg-white text-sm"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-luxury-black text-white p-4 font-bold uppercase tracking-widest text-xs hover:bg-luxury-gold transition-colors duration-300 shadow-lg disabled:opacity-50 mt-4"
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-8 text-center border-t border-gray-100 pt-8">
                        <p className="text-gray-500 text-sm font-light">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-luxury-black font-semibold hover:text-luxury-gold transition-colors">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
