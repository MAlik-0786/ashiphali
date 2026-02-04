import { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    HiLogout,
    HiTemplate,
    HiCode,
    HiMail,
    HiUserCircle,
    HiBriefcase,
    HiChartBar
} from 'react-icons/hi';
const ContactManager = lazy(() => import('../components/admin/ContactManager'));
const ProjectManager = lazy(() => import('../components/admin/ProjectManager'));
const SkillManager = lazy(() => import('../components/admin/SkillManager'));
const ExperienceManager = lazy(() => import('../components/admin/ExperienceManager'));
const StatManager = lazy(() => import('../components/admin/StatManager'));
import api from '../utils/api';

const Admin = () => {
    window.scrollTo(0, 0);
    const [activeTab, setActiveTab] = useState('contacts');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                // Verify token by fetching user details
                const res = await api.get('/api/auth/me');
                setUser(res.data.data);
            } catch (err) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        };

        checkAuth();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (!user) return null; // Or loading spinner

    return (
        <div className="min-h-screen pt-24 px-4 lg:px-8 max-w-7xl mx-auto pb-20">
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 animate-fade-in">
                <div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                        Admin <span className="text-gradient">Dashboard</span>
                    </h1>
                    <p className="text-gray-400">Welcome back, {user.email}</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-6 py-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                    <HiLogout />
                    Logout
                </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-4 mb-8 border-b border-white/10 pb-1">
                <button
                    onClick={() => setActiveTab('contacts')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-t-lg transition-colors border-b-2 ${activeTab === 'contacts'
                        ? 'border-primary text-primary bg-white/5'
                        : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <HiMail /> Messages
                </button>
                <button
                    onClick={() => setActiveTab('projects')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-t-lg transition-colors border-b-2 ${activeTab === 'projects'
                        ? 'border-primary text-primary bg-white/5'
                        : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <HiTemplate /> Projects
                </button>
                <button
                    onClick={() => setActiveTab('skills')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-t-lg transition-colors border-b-2 ${activeTab === 'skills'
                        ? 'border-primary text-primary bg-white/5'
                        : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <HiCode /> Skills
                </button>
                <button
                    onClick={() => setActiveTab('experience')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-t-lg transition-colors border-b-2 ${activeTab === 'experience'
                        ? 'border-primary text-primary bg-white/5'
                        : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <HiBriefcase /> Experience
                </button>
                <button
                    onClick={() => setActiveTab('stats')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-t-lg transition-colors border-b-2 ${activeTab === 'stats'
                        ? 'border-primary text-primary bg-white/5'
                        : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <HiChartBar /> Stats
                </button>
            </div>

            {/* Tab Content */}
            <div className="bg-dark-900 border border-white/10 rounded-2xl p-6 min-h-[500px] animate-fade-in shadow-2xl relative overflow-hidden">
                <Suspense fallback={
                    <div className="flex flex-col items-center justify-center p-20 text-gray-500">
                        <div className="spinner w-8 h-8 mb-4 border-primary"></div>
                        <p>Loading manager...</p>
                    </div>
                }>
                    {activeTab === 'contacts' && <ContactManager />}
                    {activeTab === 'projects' && <ProjectManager />}
                    {activeTab === 'skills' && <SkillManager />}
                    {activeTab === 'experience' && <ExperienceManager />}
                    {activeTab === 'stats' && <StatManager />}
                </Suspense>
            </div>
        </div>
    );
};

export default Admin;
