import { useState, useEffect } from 'react';
import { HiPlus, HiPencil, HiTrash, HiX, HiCode, HiStar } from 'react-icons/hi';
import api from '../../utils/api';
import { toast } from 'react-toastify';

const SkillManager = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        category: 'Frontend',
        level: 50,
        image: '',
        featured: false
    });

    const fetchSkills = async () => {
        setLoading(true);
        try {
            const res = await api.get('/api/skills');
            setSkills(res.data.data);
        } catch (err) {
            toast.error('Failed to load skills');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingSkill) {
                await api.put(`/api/skills/${editingSkill._id}`, formData);
                toast.success('Skill updated');
            } else {
                await api.post('/api/skills', formData);
                toast.success('Skill added');
            }
            setModalOpen(false);
            fetchSkills();
            resetForm();
        } catch (err) {
            toast.error(err.response?.data?.error || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this skill?')) return;
        try {
            await api.delete(`/api/skills/${id}`);
            toast.success('Skill deleted');
            fetchSkills();
        } catch (err) {
            toast.error('Failed to delete');
        }
    };

    const handleEdit = (skill) => {
        setEditingSkill(skill);
        setFormData(skill);
        setModalOpen(true);
    };

    const resetForm = () => {
        setEditingSkill(null);
        setFormData({
            name: '',
            category: 'Frontend',
            level: 50,
            image: '',
            featured: false
        });
    };

    if (loading && skills.length === 0) {
        return <div className="flex justify-center py-20"><div className="spinner"></div></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-dark-800/50 p-6 rounded-2xl border border-white/5">
                <div>
                    <h2 className="text-2xl font-bold font-display text-white">Manage Skills</h2>
                    <p className="text-gray-400 text-sm mt-1">Total: {skills.length} expertises</p>
                </div>

                <div className="flex-1 w-full max-w-md mx-md-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search skills by name or category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-dark-900 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-colors"
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                            <HiCode size={20} className="opacity-50" />
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => { resetForm(); setModalOpen(true); }}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-primary text-dark-900 rounded-xl font-bold hover:bg-green-400 transition-all hover:scale-105 shadow-lg shadow-primary/20"
                >
                    <HiPlus size={20} /> Add New
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-6">
                {skills.filter(s =>
                    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    s.category.toLowerCase().includes(searchTerm.toLowerCase())
                ).map(skill => (
                    <div key={skill._id} className="bg-dark-800 border border-white/10 rounded-xl p-5 flex flex-col items-center text-center group hover:border-primary/50 transition-all duration-300 relative overflow-hidden">
                        {/* Action Buttons Overlay */}
                        <div className="absolute top-2 right-2 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => handleEdit(skill)}
                                className="p-1.5 bg-dark-900/80 rounded shadow-lg text-gray-400 hover:text-primary transition-colors border border-white/10 backdrop-blur-sm"
                            >
                                <HiPencil size={14} />
                            </button>
                            <button
                                onClick={() => handleDelete(skill._id)}
                                className="p-1.5 bg-red-500/10 rounded shadow-lg text-red-500 hover:bg-red-500 hover:text-white transition-all border border-red-500/10 backdrop-blur-sm"
                            >
                                <HiTrash size={14} />
                            </button>
                        </div>

                        <div className="w-16 h-16 mb-4 bg-dark-900 rounded-2xl flex items-center justify-center text-3xl border border-white/5 group-hover:border-primary/20 transition-colors relative">
                            {skill.image?.startsWith('http') ? (
                                <img src={skill.image} alt={skill.name} className="w-10 h-10 object-contain" />
                            ) : (
                                <span className={`${skill.image} text-primary`}></span>
                            )}
                            {skill.featured && (
                                <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-primary text-dark-900 text-[8px] font-bold rounded uppercase tracking-tighter shadow-sm">
                                    Featured
                                </div>
                            )}
                        </div>

                        <h3 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors">{skill.name}</h3>
                        <span className="text-[10px] text-gray-500 px-2 py-0.5 bg-dark-900 rounded-full border border-white/5 uppercase tracking-wider">
                            {skill.category}
                        </span>

                        <div className="w-full mt-4">
                            <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                                <span>Proficiency</span>
                                <span>{skill.level}%</span>
                            </div>
                            <div className="w-full bg-dark-900 h-1.5 rounded-full overflow-hidden border border-white/5">
                                <div
                                    className="bg-primary h-full rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: `${skill.level}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}

                {skills.length === 0 && !loading && (
                    <div className="col-span-full py-16 text-center bg-dark-800 rounded-2xl border border-dashed border-white/10">
                        <p className="text-gray-400 mb-4">No skills added yet</p>
                        <button
                            onClick={() => { resetForm(); setModalOpen(true); }}
                            className="text-primary hover:underline"
                        >
                            Add your first skill
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
                            <h3 className="text-2xl font-bold">{editingSkill ? 'Edit Skill' : 'Add New Skill'}</h3>
                            <p className="text-gray-400 text-sm mt-1">Define your technical level</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Skill Name</label>
                                <input
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. React.js"
                                    className="w-full bg-dark-800 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full bg-dark-800 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary/50 transition-colors cursor-pointer"
                                >
                                    <option>Frontend</option>
                                    <option>Backend</option>
                                    <option>Tools</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-sm font-medium text-gray-400">Proficiency Level</label>
                                    <span className="text-primary font-bold">{formData.level}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={formData.level}
                                    onChange={e => setFormData({ ...formData, level: parseInt(e.target.value) })}
                                    className="w-full h-2 bg-dark-800 rounded-lg appearance-none cursor-pointer accent-primary border border-white/5"
                                />
                                <div className="flex justify-between text-[10px] text-gray-500 mt-2">
                                    <span>Beginner</span>
                                    <span>Expert</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Icon URL or DevIcon Class</label>
                                <input
                                    value={formData.image}
                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full bg-dark-800 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 transition-colors"
                                    placeholder="e.g. devicon-react-original"
                                />
                                <p className="text-[10px] text-gray-500 mt-2">
                                    Use a Direct Image URL or a class from <a href="https://devicon.dev/" target="_blank" rel="noreferrer" className="text-primary hover:underline">DevIcon</a>
                                </p>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-dark-800/50 rounded-xl border border-white/5">
                                <input
                                    type="checkbox"
                                    id="skill-featured"
                                    checked={formData.featured}
                                    onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                                    className="w-5 h-5 rounded border-white/10 text-primary focus:ring-primary bg-dark-800 cursor-pointer"
                                />
                                <label htmlFor="skill-featured" className="text-sm text-gray-300 font-medium cursor-pointer">
                                    Feature this skill (Shows on Home)
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-primary text-dark-900 font-bold rounded-xl hover:bg-green-400 transition-all hover:scale-[1.02] shadow-lg shadow-primary/20 mt-4"
                            >
                                {editingSkill ? 'Update Skill' : 'Create Skill'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SkillManager;

