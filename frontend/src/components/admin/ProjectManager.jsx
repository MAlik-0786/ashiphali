import { useState, useEffect } from 'react';
import { HiPlus, HiPencil, HiTrash, HiX, HiStar } from 'react-icons/hi';
import api from '../../utils/api';
import { toast } from 'react-toastify';

const ProjectManager = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        longDescription: '',
        category: 'Frontend',
        tech: '',
        image: '',
        link: '',
        github: '',
        featured: false
    });

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const res = await api.get('/api/projects');
            setProjects(res.data.data);
        } catch (err) {
            toast.error('Failed to load projects');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const techArray = typeof formData.tech === 'string'
            ? formData.tech.split(',').map(t => t.trim())
            : formData.tech;
        const data = { ...formData, tech: techArray };

        try {
            if (editingProject) {
                await api.put(`/api/projects/${editingProject._id}`, data);
                toast.success('Project updated');
            } else {
                await api.post('/api/projects', data);
                toast.success('Project added');
            }
            setModalOpen(false);
            fetchProjects();
            resetForm();
        } catch (err) {
            toast.error(err.response?.data?.error || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;
        try {
            await api.delete(`/api/projects/${id}`);
            toast.success('Project deleted');
            fetchProjects();
        } catch (err) {
            toast.error('Failed to delete');
        }
    };

    const handleEdit = (project) => {
        setEditingProject(project);
        setFormData({
            ...project,
            tech: Array.isArray(project.tech) ? project.tech.join(', ') : project.tech
        });
        setModalOpen(true);
    };

    const resetForm = () => {
        setEditingProject(null);
        setFormData({
            title: '',
            description: '',
            category: 'Frontend',
            tech: '',
            image: '',
            link: '',
            github: '',
            featured: false,
            longDescription: ''
        });
    };

    if (loading && projects.length === 0) {
        return <div className="flex justify-center py-20"><div className="spinner"></div></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-dark-800/50 p-6 rounded-2xl border border-white/5">
                <div>
                    <h2 className="text-2xl font-bold font-display text-white">Manage Projects</h2>
                    <p className="text-gray-400 text-sm mt-1">Total: {projects.length} creations</p>
                </div>

                <div className="flex-1 w-full max-w-md mx-md-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-dark-900 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-colors"
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                            <HiStar size={20} className="opacity-50" />
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {projects.filter(p =>
                    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (Array.isArray(p.tech) && p.tech.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())))
                ).map(project => (
                    <div key={project._id} className="bg-dark-800 border border-white/10 rounded-xl overflow-hidden group hover:border-primary/50 transition-all duration-300">
                        <div className="relative h-48 bg-dark-900">
                            {project.image ? (
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-600">No Image</div>
                            )}

                            {/* Badges */}
                            <div className="absolute top-3 left-3 flex flex-col gap-2">
                                {project.featured && (
                                    <span className="flex items-center gap-1 px-2 py-1 bg-primary text-dark-900 text-[10px] font-bold rounded uppercase">
                                        <HiStar /> Featured
                                    </span>
                                )}
                                <span className="px-2 py-1 bg-dark-900/80 text-white text-[10px] font-bold rounded uppercase backdrop-blur-sm border border-white/10">
                                    {project.category}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="absolute top-3 right-3 flex gap-2">
                                <button
                                    onClick={() => handleEdit(project)}
                                    className="p-2 bg-dark-900/80 rounded-lg text-white hover:text-primary transition-colors border border-white/10 backdrop-blur-sm"
                                    title="Edit Project"
                                >
                                    <HiPencil size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(project._id)}
                                    className="p-2 bg-red-500/20 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all border border-red-500/20 backdrop-blur-sm"
                                    title="Delete Project"
                                >
                                    <HiTrash size={18} />
                                </button>
                            </div>
                        </div>
                        <div className="p-5">
                            <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                            <p className="text-sm text-gray-400 line-clamp-3 mb-4 min-h-[60px]">{project.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {Array.isArray(project.tech) && project.tech.map((t, i) => (
                                    <span key={i} className="px-2 py-1 bg-dark-900 text-gray-400 text-[10px] rounded border border-white/5">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}

                {projects.length === 0 && !loading && (
                    <div className="col-span-full py-20 text-center bg-dark-800 rounded-2xl border border-dashed border-white/10">
                        <p className="text-gray-400 mb-4">No projects found</p>
                        <button
                            onClick={() => { resetForm(); setModalOpen(true); }}
                            className="text-primary hover:underline"
                        >
                            Add your first project
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
                            <h3 className="text-2xl font-bold">{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
                            <p className="text-gray-400 text-sm mt-1">Fill in the details below</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Project Title</label>
                                    <input
                                        required
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="e.g. My Awesome Portfolio"
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
                                        <option>Full Stack</option>
                                        <option>Mobile</option>
                                        <option>UI/UX</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Short Description</label>
                                <textarea
                                    required
                                    rows="2"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Brief summary for project cards..."
                                    className="w-full bg-dark-800 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Long Description</label>
                                <textarea
                                    rows="5"
                                    value={formData.longDescription}
                                    onChange={e => setFormData({ ...formData, longDescription: e.target.value })}
                                    placeholder="Detailed project explanation..."
                                    className="w-full bg-dark-800 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Technologies (comma separated)</label>
                                <input
                                    required
                                    value={formData.tech}
                                    onChange={e => setFormData({ ...formData, tech: e.target.value })}
                                    placeholder="React, Node.js, MongoDB, Tailwind CSS"
                                    className="w-full bg-dark-800 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Image URL</label>
                                <input
                                    value={formData.image}
                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full bg-dark-800 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 transition-colors"
                                    placeholder="https://images.unsplash.com/..."
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Live Demo URL</label>
                                    <input
                                        value={formData.link}
                                        onChange={e => setFormData({ ...formData, link: e.target.value })}
                                        placeholder="https://myproject.com"
                                        className="w-full bg-dark-800 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">GitHub Repo URL</label>
                                    <input
                                        value={formData.github}
                                        onChange={e => setFormData({ ...formData, github: e.target.value })}
                                        placeholder="https://github.com/user/repo"
                                        className="w-full bg-dark-800 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-dark-800/50 rounded-xl border border-white/5">
                                <input
                                    type="checkbox"
                                    id="featured"
                                    checked={formData.featured}
                                    onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                                    className="w-5 h-5 rounded border-white/10 text-primary focus:ring-primary bg-dark-800 cursor-pointer"
                                />
                                <label htmlFor="featured" className="text-sm text-gray-300 font-medium cursor-pointer">
                                    Display as Featured Project
                                </label>
                            </div>

                            <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
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
                                    {editingProject ? 'Save Changes' : 'Create Project'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectManager;

