import { useState, useEffect, useMemo } from 'react'
import { HiArrowRight, HiExternalLink, HiCode } from 'react-icons/hi'
import api from '../utils/api'
import { portfolioData } from '../data/portfolioData' // Fallback if needed

const Projects = () => {

    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('All')

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await api.get('/api/projects')
                if (res.data.data && res.data.data.length > 0) {
                    setProjects(res.data.data)
                } else {
                    // Fallback to static data if no projects in DB yet
                    setProjects(portfolioData.projects)
                }
            } catch (err) {
                setProjects(portfolioData.projects)
            } finally {
                setLoading(false)
            }
        }
        fetchProjects()
    }, [])

    // Get unique categories - memoized
    const categories = useMemo(() => {
        return ['All', ...new Set(projects.map(p => p.category))]
    }, [projects])

    // Filter projects - memoized
    const filteredProjects = useMemo(() => {
        return filter === 'All'
            ? projects
            : projects.filter(p => p.category === filter)
    }, [projects, filter])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="spinner w-12 h-12"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen pt-20">
            <section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 animate-fade-in">
                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
                        My <span className="text-gradient">Creations</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        A selection of projects that demonstrate my passion for building
                        digital experiences.
                    </p>
                </div>

                {/* Filter */}
                <div className="flex flex-wrap justify-center gap-4 mb-16 animate-fade-in">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${filter === cat
                                ? 'bg-primary text-dark-900 border-primary'
                                : 'bg-transparent text-gray-400 border-white/10 hover:border-primary/50 hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="space-y-32">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={project._id || project.id}
                            className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                                } animate-fade-in`}
                        >
                            {/* Project Image */}
                            <div className="w-full lg:w-3/5 group relative">
                                <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/10 shadow-2xl">
                                    <div className="absolute inset-0 bg-dark-900/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    />

                                    {/* Overlay Links */}
                                    <div className="absolute inset-0 z-20 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-dark-900/80 backdrop-blur-sm">
                                        {project.link !== '#' && project.link && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-4 bg-primary text-dark-900 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-110"
                                                title="View Live Site"
                                            >
                                                <HiExternalLink size={24} />
                                            </a>
                                        )}
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-4 bg-white text-dark-900 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100 hover:scale-110"
                                                title="View Code"
                                            >
                                                <HiCode size={24} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Decorative Elements */}
                                <div className={`absolute -bottom-4 ${index % 2 === 0 ? '-left-4' : '-right-4'} w-24 h-24 bg-primary/20 rounded-full blur-2xl -z-10`}></div>
                            </div>

                            {/* Project Info */}
                            <div className="w-full lg:w-2/5 space-y-6">
                                <div className="flex items-center gap-4">
                                    <span className="text-primary font-mono text-sm tracking-wider uppercase">0{index + 1}</span>
                                    <div className="h-px bg-white/20 flex-1"></div>
                                    <span className="text-gray-400 text-sm uppercase tracking-wider">{project.category}</span>
                                </div>

                                <h2 className="text-4xl font-display font-bold">{project.title}</h2>

                                <p className="text-gray-400 text-lg leading-relaxed">
                                    {project.longDescription || project.description}
                                </p>

                                <div className="flex flex-wrap gap-3 pt-4">
                                    {Array.isArray(project.tech) && project.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:border-primary/30 transition-colors"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-20 border-t border-white/10">
                <div className="text-center">
                    <h2 className="text-3xl font-display font-bold mb-6">Want to see more?</h2>
                    <a
                        href="https://github.com/MAlik-0786"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300"
                    >
                        Visit My GitHub <HiCode />
                    </a>
                </div>
            </section>
        </div>
    )
}

export default Projects
