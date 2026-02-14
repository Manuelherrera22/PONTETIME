import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await signIn({ email, password });
            if (error) throw error;

            // Role-based redirect
            if (email === 'herreraflorezm@yahoo.com.co') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error("Login Error Details:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center pt-24 pb-12 px-6">
            <SEO title="Login | PonteTIME" />
            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-serif text-luxury-black mb-2">Welcome Back</h1>
                    <p className="text-gray-500">Sign in to manage your collection.</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 p-4 mb-6 text-sm border border-red-100 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            required
                            className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-luxury-gold transition-colors bg-transparent placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-luxury-gold transition-colors bg-transparent placeholder-gray-400"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-luxury-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-500">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-luxury-gold hover:underline">
                        Create one
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
