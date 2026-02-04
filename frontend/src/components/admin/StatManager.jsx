import { useState, useEffect } from 'react';
import { HiPlus, HiPencil, HiTrash, HiX, HiChartBar } from 'react-icons/hi';
import api from '../../utils/api';
import { toast } from 'react-toastify';

const StatManager = () => {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingStat, setEditingStat] = useState(null);
    const [formData, setFormData] = useState({
        label: '',
        value: '',
        order: 0
    });

    const fetchStats = async () => {
        setLoading(true);
        try {
            const res = await api.get('/api/stats');
            setStats(res.data.data);
        } catch (err) {
            toast.error('Failed to load statistics');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingStat) {
                await api.put(`/api/stats/${editingStat._id}`, formData);
                toast.success('Stat updated');
            } else {
                await api.post('/api/stats', formData);
                toast.success('Stat added');
            }
            setModalOpen(false);
            fetchStats();
            resetForm();
        } catch (err) {
            toast.error(err.response?.data?.error || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this statistic?')) return;
        try {
            await api.delete(`/api/stats/${id}`);
            toast.success('Stat deleted');
            fetchStats();
        } catch (err) {
            toast.error('Delete failed');
        }
    };

    const handleEdit = (stat) => {
        setEditingStat(stat);
        setFormData({
            label: stat.label,
            value: stat.value,
            order: stat.order || 0
        });
        setModalOpen(true);
    };

    const resetForm = () => {
        setEditingStat(null);
        setFormData({
            label: '',
            value: '',
            order: 0
        });
    };

    if (loading && stats.length === 0) {
        return <div className="flex justify-center py-20"><div className="spinner"></div></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-dark-800/50 p-6 rounded-2xl border border-white/5">
                <div>
                    <h2 className="text-2xl font-bold font-display text-white">Manage Statistics</h2>
                    <p className="text-gray-400 text-sm mt-1">Total: {stats.length} metrics</p>
                </div>
                <button
                    onClick={() => { resetForm(); setModalOpen(true); }}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-primary text-dark-900 rounded-xl font-bold hover:bg-green-400 transition-all hover:scale-105 shadow-lg shadow-primary/20"
                >
                    <HiPlus size={20} /> Add New
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map(stat => (
                    <div key={stat._id} className="bg-dark-800 border border-white/10 rounded-xl p-6 group hover:border-primary/50 transition-all duration-300 relative">
                        <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => handleEdit(stat)}
                                className="p-1.5 bg-dark-900/80 rounded text-gray-400 hover:text-primary transition-colors border border-white/10"
                            >
                                <HiPencil size={14} />
                            </button>
                            <button
                                onClick={() => handleDelete(stat._id)}
                                className="p-1.5 bg-red-500/10 rounded text-red-500 hover:bg-red-500 hover:text-white transition-all border border-red-500/10"
                            >
                                <HiTrash size={14} />
                            </button>
                        </div>

                        <div className="text-center space-y-2">
                            <div className="text-3xl font-bold text-gradient">{stat.value}</div>
                            <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
                            <div className="text-[10px] text-gray-600">Order: {stat.order}</div>
                        </div>
                    </div>
                ))}

                {stats.length === 0 && !loading && (
                    <div className="col-span-full py-16 text-center bg-dark-800 rounded-2xl border border-dashed border-white/10">
                        <p className="text-gray-400 mb-4">No statistics records found</p>
                        <button
                            onClick={() => { resetForm(); setModalOpen(true); }}
                            className="text-primary hover:underline"
                        >
                            Add your first stat
                        </button>
                    </div>
                )}
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
                    <div className="bg-dark-900 w-full max-w-md rounded-2xl border border-white/10 p-8 animate-fade-in relative shadow-2xl">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                        >
                            <HiX size={28} />
                        </button>

                        <div className="mb-8">
                            <h3 className="text-2xl font-bold">{editingStat ? 'Edit Statistic' : 'Add New Stat'}</h3>
                            <p className="text-gray-400 text-sm mt-1">Portfolio highlight metrics</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Value (e.g. 50+, 5+)</label>
                                <input
                                    required
                                    value={formData.value}
                                    onChange={e => setFormData({ ...formData, value: e.target.value })}
                                    placeholder="e.g. 10+"
                                    className="w-full bg-dark-800 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 transition-colors text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Label</label>
                                <input
                                    required
                                    value={formData.label}
                                    onChange={e => setFormData({ ...formData, label: e.target.value })}
                                    placeholder="e.g. Projects Completed"
                                    className="w-full bg-dark-800 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 transition-colors text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Display Order</label>
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                    className="w-full bg-dark-800 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 transition-colors text-white"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-primary text-dark-900 font-bold rounded-xl hover:bg-green-400 transition-all hover:scale-[1.02] shadow-lg shadow-primary/20 mt-4"
                            >
                                {editingStat ? 'Update Stat' : 'Create Stat'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StatManager;
