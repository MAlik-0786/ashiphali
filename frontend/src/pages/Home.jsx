import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HiArrowRight, HiCode, HiLightningBolt } from 'react-icons/hi'
import { portfolioData } from '../data/portfolioData'
import api from '../utils/api'

const Home = () => {
    window.scrollTo(0, 0);
    const [featuredProjects, setFeaturedProjects] = useState([])
    const [skills, setSkills] = useState([])
    const [stats, setStats] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [projectsRes, skillsRes, statsRes] = await Promise.all([
                    api.get('/api/projects'),
                    api.get('/api/skills'),
                    api.get('/api/stats')
                ])

                const projects = projectsRes.data.data || []
                const featured = projects.filter(p => p.featured)

                // Logic: Show featured projects if any, else show latest 2 projects, 
                // else show fallback static projects
                let projectsToShow = []
                if (featured.length > 0) {
                    projectsToShow = featured.slice(0, 3)
                } else if (projects.length > 0) {
                    projectsToShow = projects.slice(0, 3)
                } else {
                    projectsToShow = portfolioData.projects.slice(0, 3)
                }

                setFeaturedProjects(projectsToShow)

                const remoteSkills = skillsRes.data.data || []
                const featuredSkills = remoteSkills.filter(s => s.featured)
                const otherSkills = remoteSkills.filter(s => !s.featured)

                // Combine: Featured first, then others
                let combinedSkills = [...featuredSkills, ...otherSkills]

                // If we have fewer than 8, fill with static ones that aren't already included by name
                if (combinedSkills.length < 8) {
                    const staticSkills = portfolioData.projects.flatMap(p => p.tech || [])
                        .filter((v, i, a) => a.indexOf(v) === i) // Unique
                        .filter(name => !combinedSkills.some(s => s.name.toLowerCase() === name.toLowerCase()))
                        .map(name => ({ name, _id: name }))

                    combinedSkills = [...combinedSkills, ...staticSkills].slice(0, 8)
                } else {
                    combinedSkills = combinedSkills.slice(0, 8)
                }

                setSkills(combinedSkills)

                const remoteStats = statsRes.data.data || []
                if (remoteStats.length > 0) {
                    setStats(remoteStats)
                } else {
                    setStats([
                        { label: 'Projects', value: portfolioData.stats.projectsCompleted },
                        { label: 'Experience', value: portfolioData.stats.yearsExperience },
                        { label: 'Clients', value: portfolioData.stats.happyClients },
                        { label: 'Technologies', value: portfolioData.stats.technologies }
                    ])
                }
            } catch (err) {
                // Fallback to static data
                setFeaturedProjects(portfolioData.projects.slice(0, 3))
                const staticSkills = portfolioData.projects.flatMap(p => p.tech || [])
                    .filter((v, i, a) => a.indexOf(v) === i)
                    .map(name => ({ name, _id: name }))
                setSkills(staticSkills.slice(0, 8))
                setStats([
                    { label: 'Projects', value: portfolioData.stats.projectsCompleted },
                    { label: 'Experience', value: portfolioData.stats.yearsExperience },
                    { label: 'Clients', value: portfolioData.stats.happyClients },
                    { label: 'Technologies', value: portfolioData.stats.technologies }
                ])
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                    {/* Left Content */}
                    <div className="space-y-8 animate-fade-in">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                            <span className="text-gray-400">Available for freelance work</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight">
                            Digital<br />
                            <span className="text-gradient">Product</span><br />
                            Designer
                        </h1>

                        <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed">
                            {portfolioData.personal.tagline}
                            <span className="block mt-4 text-primary font-semibold">
                                {portfolioData.personal.experience}
                            </span>
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/projects"
                                className="group inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-primary to-green-400 text-dark-900 font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                            >
                                View My Work
                                <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
                            >
                                Get In Touch
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10">
                            {stats.map((stat, idx) => (
                                <div key={stat._id || idx}>
                                    <div className="text-3xl font-bold text-gradient">{stat.value}</div>
                                    <div className="text-sm text-gray-500 mt-1 uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative animate-fade-in lg:block hidden">
                        <div className="relative z-10">
                            <img
                                src="/images/hero.png"
                                alt="Ashiph Ali"
                                className="w-full h-auto rounded-2xl shadow-2xl"
                            />
                            {/* Decorative Elements */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
                            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-400/20 rounded-full blur-2xl"></div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
                        <div className="w-1 h-2 bg-primary rounded-full"></div>
                    </div>
                </div>
            </section>

            {/* About Preview Section with Skills */}
            <section className="py-20 bg-dark-800/50">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-5xl font-display font-bold">
                                About <span className="text-gradient">Me</span>
                            </h2>
                            <p className="text-lg text-gray-400 leading-relaxed">
                                I am passionate about crafting intuitive and visually appealing user
                                experiences that leave a lasting impact. With my experience
                                in the industry, I have honed my skills in translating complex ideas
                                into delightful, user-centric designs.
                            </p>
                            <Link
                                to="/about"
                                className="inline-flex items-center gap-2 text-primary hover:gap-4 transition-all duration-300"
                            >
                                Learn More About Me
                                <HiArrowRight />
                            </Link>

                            <div className="pt-8">
                                <h3 className="text-xl font-bold mb-4">Core Skills</h3>
                                <div className="flex flex-wrap gap-3">
                                    {skills.map((skill, index) => (
                                        <span
                                            key={skill._id || index}
                                            className="px-4 py-2 bg-dark-900 border border-white/10 rounded-lg text-sm transition-all hover:border-primary/50 flex items-center gap-2"
                                        >
                                            {skill.image && !skill.image.startsWith('http') && <i className={`${skill.image} text-primary`}></i>}
                                            {skill.image && skill.image.startsWith('http') && <img src={skill.image} alt="" className="w-4 h-4 object-contain" />}
                                            {skill.name}
                                        </span>
                                    ))}
                                    {skills.length === 0 && (
                                        <>
                                            <span className="px-4 py-2 bg-dark-900 border border-white/10 rounded-lg text-sm">React</span>
                                            <span className="px-4 py-2 bg-dark-900 border border-white/10 rounded-lg text-sm">Node.js</span>
                                            <span className="px-4 py-2 bg-dark-900 border border-white/10 rounded-lg text-sm">MongoDB</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-6 bg-dark-900 border border-white/10 rounded-xl hover:border-primary/50 transition-all duration-300">
                                <HiCode className="text-4xl text-primary mb-4" />
                                <h3 className="text-xl font-semibold mb-2">Frontend</h3>
                                <p className="text-sm text-gray-400">
                                    React, JavaScript, Tailwind CSS, HTML5
                                </p>
                            </div>
                            <div className="p-6 bg-dark-900 border border-white/10 rounded-xl hover:border-primary/50 transition-all duration-300 mt-8">
                                <HiLightningBolt className="text-4xl text-primary mb-4" />
                                <h3 className="text-xl font-semibold mb-2">Backend</h3>
                                <p className="text-sm text-gray-400">
                                    Node.js, Express, MongoDB, SQL
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                            Featured <span className="text-gradient">Work</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Explore some of my recent projects showcasing modern web development
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredProjects.map((project, index) => (
                            <div
                                key={project._id || project.id}
                                className="group relative bg-dark-800 rounded-2xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="aspect-video relative overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-dark-900 via-dark-900/50 to-transparent"></div>
                                </div>

                                <div className="p-6">
                                    <div className="text-sm text-primary mb-2">{project.category}</div>
                                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                                    <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {Array.isArray(project.tech) && project.tech.slice(0, 3).map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-full"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <Link
                                        to="/projects"
                                        className="inline-flex items-center gap-2 text-primary hover:gap-4 transition-all duration-300"
                                    >
                                        View Project
                                        <HiArrowRight />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            to="/projects"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
                        >
                            View All Projects
                            <HiArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-linear-to-r from-primary/10 to-green-400/10">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                        Let's Work <span className="text-gradient">Together</span>
                    </h2>
                    <p className="text-xl text-gray-400 mb-8">
                        Have a project in mind? Let's create something amazing together.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-primary to-green-400 text-dark-900 font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                    >
                        Start a Project
                        <HiArrowRight />
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default Home

