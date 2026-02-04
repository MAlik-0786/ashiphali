import { useState, useEffect } from 'react'
import { HiCode, HiDatabase, HiCog } from 'react-icons/hi'
import { portfolioData } from '../data/portfolioData'
import api from '../utils/api'

const About = () => {
    window.scrollTo(0, 0);
    const [skills, setSkills] = useState({
        frontend: [],
        backend: [],
        tools: []
    })
    const [loading, setLoading] = useState(true)
    const [experience, setExperience] = useState([])
    const [stats, setStats] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [skillsRes, expRes, statsRes] = await Promise.all([
                    api.get('/api/skills'),
                    api.get('/api/experiences'),
                    api.get('/api/stats')
                ])

                const allSkills = skillsRes.data.data
                if (allSkills && allSkills.length > 0) {
                    setSkills({
                        frontend: allSkills.filter(s => s.category === 'Frontend'),
                        backend: allSkills.filter(s => s.category === 'Backend'),
                        tools: allSkills.filter(s => s.category === 'Tools' || s.category === 'Other')
                    })
                } else {
                    setSkills({
                        frontend: portfolioData.skills.frontend.map(s => ({ name: s })),
                        backend: portfolioData.skills.backend.map(s => ({ name: s })),
                        tools: portfolioData.skills.tools.map(s => ({ name: s }))
                    })
                }

                const allExp = expRes.data.data
                if (allExp && allExp.length > 0) {
                    setExperience(allExp)
                } else {
                    setExperience([
                        {
                            from: "2024", to: "Present",
                            title: "Full Stack Developer", company: "Freelance",
                            description: "Building modern web applications using MERN stack, focusing on scalable architecture and user experience."
                        }
                    ])
                }

                const remoteStats = statsRes.data.data || []
                if (remoteStats.length > 0) {
                    setStats(remoteStats)
                } else {
                    setStats([
                        { label: 'Projects Completed', value: portfolioData.stats.projectsCompleted },
                        { label: 'Years Experience', value: portfolioData.stats.yearsExperience }
                    ])
                }
            } catch (err) {
                console.error('Error fetching about data:', err)
                setSkills({
                    frontend: portfolioData.skills.frontend.map(s => ({ name: s })),
                    backend: portfolioData.skills.backend.map(s => ({ name: s })),
                    tools: portfolioData.skills.tools.map(s => ({ name: s }))
                })
                setStats([
                    { label: 'Projects Completed', value: portfolioData.stats.projectsCompleted },
                    { label: 'Years Experience', value: portfolioData.stats.yearsExperience }
                ])
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const skillCategories = [
        {
            title: "Frontend Development",
            icon: HiCode,
            skills: skills.frontend,
            color: "from-blue-500 to-cyan-500"
        },
        {
            title: "Backend Development",
            icon: HiDatabase,
            skills: skills.backend,
            color: "from-green-500 to-emerald-500"
        },
        {
            title: "Tools & Others",
            icon: HiCog,
            skills: skills.tools,
            color: "from-purple-500 to-pink-500"
        }
    ]

    return (
        <div className="min-h-screen pt-20">
            {/* Hero Section with Image */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Image */}
                        <div className="relative animate-fade-in">
                            <div className="relative z-10">
                                <img
                                    src="/images/hero.png"
                                    alt="Workspace"
                                    className="w-full h-auto rounded-2xl shadow-2xl scale-x-[-1]"
                                />
                                {/* Decorative Elements */}
                                <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
                                <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-green-400/20 rounded-full blur-3xl"></div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-6 animate-fade-in">
                            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold">
                                About Me
                            </div>

                            <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight">
                                Crafting Digital
                                <span className="text-gradient block">Experiences</span>
                            </h1>

                            <div className="space-y-4 text-lg text-gray-400 leading-relaxed">
                                <p>
                                    {portfolioData.personal.tagline}
                                </p>
                                <p className="text-primary font-semibold">
                                    {portfolioData.personal.experience}
                                </p>
                                <p>
                                    I specialize in building modern, scalable web applications using the MERN stack.
                                    My approach combines clean code, intuitive design, and performance optimization
                                    to deliver exceptional digital products.
                                </p>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 gap-6 pt-6">
                                {stats.slice(0, 2).map((stat, idx) => (
                                    <div key={stat._id || idx} className="p-4 bg-dark-800 rounded-xl border border-white/10">
                                        <div className="text-3xl font-bold text-gradient mb-1">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="py-20 bg-dark-800/50">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                            My <span className="text-gradient">Skills</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            A comprehensive toolkit for building modern web applications
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {skillCategories.map((category, index) => (
                            <div
                                key={category.title}
                                className="group p-8 bg-dark-900 border border-white/10 rounded-2xl hover:border-primary/50 transition-all duration-300 animate-fade-in"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className={`w-16 h-16 rounded-xl bg-linear-to-br ${category.color} p-0.5 mb-6`}>
                                    <div className="w-full h-full bg-dark-900 rounded-xl flex items-center justify-center">
                                        <category.icon className="text-3xl text-white" />
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold mb-6">{category.title}</h3>

                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill, sIndex) => (
                                        <div key={skill._id || sIndex} className="relative group/skill">
                                            <span
                                                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 flex items-center gap-2"
                                            >
                                                {skill.image && !skill.image.startsWith('http') && <i className={`${skill.image} text-white`}></i>}
                                                {skill.image && skill.image.startsWith('http') && <img src={skill.image} alt="" className="w-4 h-4 object-contain" />}
                                                {skill.name}
                                            </span>
                                            {skill.level > 0 && (
                                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-primary text-dark-900 text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/skill:opacity-100 transition-opacity whitespace-nowrap">
                                                    Level: {skill.level}%
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience Timeline */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                            My <span className="text-gradient">Journey</span>
                        </h2>
                        <p className="text-gray-400">
                            Key milestones in my development career
                        </p>
                    </div>

                    <div className="space-y-8">
                        {experience.map((item, index) => (
                            <div
                                key={item._id || index}
                                className="relative pl-8 border-l-2 border-white/10 hover:border-primary/50 transition-all duration-300 animate-fade-in"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary"></div>
                                <div className="pb-8">
                                    <div className="text-sm text-primary font-semibold mb-2">
                                        {item.from} - {item.to}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-1">{item.title}</h3>
                                    <div className="text-gray-400 mb-3">{item.company}</div>
                                    {item.location && <div className="text-gray-500 text-xs mb-2 italic">{item.location}</div>}
                                    <p className="text-gray-500">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-linear-to-r from-primary/10 to-green-400/10">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                        Let's Create Something <span className="text-gradient">Amazing</span>
                    </h2>
                    <p className="text-xl text-gray-400 mb-8">
                        I'm always open to discussing new projects and opportunities.
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-primary to-green-400 text-dark-900 font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                    >
                        Get In Touch
                    </a>
                </div>
            </section>
        </div>
    )
}

export default About
