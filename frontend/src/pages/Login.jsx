import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../utils/api';
import { HiLockClosed } from 'react-icons/hi';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post('/api/auth/login', formData);
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                toast.success('Logged in successfully');
                navigate('/admin');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
            <div className="max-w-md w-full bg-dark-900 border border-white/10 p-8 rounded-2xl animate-fade-in">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HiLockClosed className="text-3xl text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold font-display">Admin Login</h1>
                    <p className="text-gray-400 mt-2">Enter your credentials to access dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full bg-dark-800 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                            placeholder="admin@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full bg-dark-800 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-dark-900 font-bold py-3 rounded-lg hover:bg-green-400 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
