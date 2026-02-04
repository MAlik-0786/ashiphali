import { useState, useEffect } from 'react';
import { HiPlus, HiPencil, HiTrash, HiX, HiOfficeBuilding, HiCalendar } from 'react-icons/hi';
import api from '../../utils/api';
import { toast } from 'react-toastify';

const ExperienceManager = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingExp, setEditingExp] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const fetchExperiences = async () => {
        setLoading(true);
        try {
            const res = await api.get('/api/experiences');
            setExperiences(res.data.data);
        } catch (err) {
            toast.error('Failed to load experiences');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExperiences();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingExp) {
                await api.put(`/api/experiences/${editingExp._id}`, formData);
                toast.success('Experience updated');
            } else {
                await api.post('/api/experiences', formData);
                toast.success('Experience added');
            }
            setModalOpen(false);
            fetchExperiences();
            resetForm();
        } catch (err) {
            toast.error(err.response?.data?.error || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this experience record?')) return;
        try {
            await api.delete(`/api/experiences/${id}`);
            toast.success('Experience deleted');
            fetchExperiences();
        } catch (err) {
            toast.error('Delete failed');
        }
    };

    const handleEdit = (exp) => {
        setEditingExp(exp);
        setFormData(exp);
        setModalOpen(true);
    };

    const resetForm = () => {
        setEditingExp(null);
        setFormData({
            title: '',
            company: '',
            location: '',
            from: '',
            to: '',
            current: false,
            description: ''
        });
    };

    if (loading && experiences.length === 0) {
        return <div className="flex justify-center py-20"><div className="spinner"></div></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-dark-800/50 p-6 rounded-2xl border border-white/5">
                <div>
                    <h2 className="text-2xl font-bold font-display text-white">Manage Experience</h2>
                    <p className="text-gray-400 text-sm mt-1">Total: {experiences.length} records</p>
                </div>
                <button
                    onClick={() => { resetForm(); setModalOpen(true); }}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-primary text-dark-900 rounded-xl font-bold hover:bg-green-400 transition-all hover:scale-105 shadow-lg shadow-primary/20"
                >
                    <HiPlus size={20} /> Add New
                </button>
            </div>

            <div className="space-y-4">
                {experiences.map(exp => (
                    <div key={exp._id} className="bg-dark-800 border border-white/10 rounded-xl p-6 group hover:border-primary/50 transition-all duration-300 relative">
                        <div className="absolute top-6 right-6 flex gap-2">
                            <button
                                onClick={() => handleEdit(exp)}
                                className="p-2 bg-dark-900/80 rounded-lg text-white hover:text-primary transition-colors border border-white/10"
                            >
                                <HiPencil size={18} />
                            </button>
                            <button
                                onClick={() => handleDelete(exp._id)}
                                className="p-2 bg-red-500/20 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                            >
                                <HiTrash size={18} />
                            </button>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-dark-900 rounded-xl flex items-center justify-center text-primary border border-white/5 group-hover:border-primary/30 shrink-0">
                                <HiOfficeBuilding size={24} />
                            </div>
                            <div className="space-y-1 pr-20">
                                <h3 className="font-bold text-xl group-hover:text-primary transition-colors">{exp.title}</h3>
                                <p className="text-primary text-sm font-medium">{exp.company}</p>
                                <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                                    <span className="flex items-center gap-1"><HiCalendar /> {exp.from} - {exp.to}</span>
                                    {exp.location && <span>• {exp.location}</span>}
                                </div>
                                <p className="text-gray-400 text-sm mt-4 line-clamp-2 md:line-clamp-none">
                                    {exp.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

                {experiences.length === 0 && !loading && (
                    <div className="py-20 text-center bg-dark-800 rounded-2xl border border-dashed border-white/10">
                        <p className="text-gray-400 mb-4">No experience records found</p>
                        <button
                            onClick={() => { resetForm(); setModalOpen(true); }}
                            className="text-primary hover:underline"
                        >
                            Add your first experience
                        </button>
                    </div>
                )}
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
                    <div className="bg-dark-900 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 p-8 animate-fade-in relative shadow-2xl">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                        >
                            <HiX size={28} />
                        </button>

                        <div className="mb-8">
                            <h3 className="text-2xl font-bold">{editingExp ? 'Edit Experience' : 'Add New Record'}</h3>
                            <p className="text-gray-400 text-sm mt-1">Professional history details</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Job Title</label>
                                    <input
                                        required
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="e.g. Senior Frontend Developer"
                                        className="w-full bg-dark-800 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 transition-colors text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Company</label>
                                    <input
                                        required
                                        value={formData.company}
                                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                                        placeholder="e.g. Google"
                                        className="w-full bg-dark-800 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 transition-colors text-white"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">From</label>
                                    <input
                                        required
                                        value={formData.from}
                                        onChange={e => setFormData({ ...formData, from: e.target.value })}
                                        placeholder="e.g. Jan 2022"
                                        className="w-full bg-dark-800 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 transition-colors text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">To</label>
                                    <input
                                        required
                                        value={formData.to}
                                        onChange={e => setFormData({ ...formData, to: e.target.value })}
                                        placeholder="e.g. Present"
                                        className="w-full bg-dark-800 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 transition-colors text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Location</label>
                                <input
                                    value={formData.location}
                                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                                    placeholder="e.g. Mountain View, CA (Remote)"
                                    className="w-full bg-dark-800 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 transition-colors text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                                <textarea
                                    required
                                    rows="4"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Describe your role and impact..."
                                    className="w-full bg-dark-800 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 transition-colors text-white resize-none"
                                ></textarea>
                            </div>

                            <div className="flex justify-end gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-6 py-3 hover:bg-white/5 rounded-xl text-gray-400 font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-10 py-3 bg-primary text-dark-900 font-bold rounded-xl hover:bg-green-400 transition-all hover:scale-105 shadow-lg shadow-primary/20"
                                >
                                    {editingExp ? 'Save Changes' : 'Create Record'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExperienceManager;
