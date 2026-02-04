import ContactForm from '../components/ContactForm'
import { HiCode, HiLightningBolt, HiSparkles } from 'react-icons/hi'
import './Home.css'

const Home = () => {
    return (
        <div className="home-page">
            <section className="hero-section">
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-badge">
                            <HiSparkles /> Available for freelance work
                        </div>
                        <h1 className="hero-title">
                            Let's Build Something
                            <span className="text-gradient"> Amazing Together</span>
                        </h1>
                        <p className="hero-description">
                            Full Stack Developer specializing in MERN stack. I create modern,
                            scalable web applications with beautiful user experiences.
                        </p>
                        <div className="hero-stats">
                            <div className="stat-item">
                                <HiCode size={24} />
                                <div>
                                    <div className="stat-value">50+</div>
                                    <div className="stat-label">Projects Completed</div>
                                </div>
                            </div>
                            <div className="stat-item">
                                <HiLightningBolt size={24} />
                                <div>
                                    <div className="stat-value">3+</div>
                                    <div className="stat-label">Years Experience</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="contact-section">
                <div className="container">
                    <ContactForm />
                </div>
            </section>

            <section className="skills-section">
                <div className="container">
                    <h2 className="section-title text-center">
                        Tech <span className="text-gradient">Stack</span>
                    </h2>
                    <div className="skills-grid">
                        <div className="skill-card">
                            <h3>Frontend</h3>
                            <p>React.js, HTML, CSS, JavaScript, Bootstrap, TailwindCSS</p>
                        </div>
                        <div className="skill-card">
                            <h3>Backend</h3>
                            <p>Node.js, Express.js, MongoDB, SQL</p>
                        </div>
                        <div className="skill-card">
                            <h3>Tools & Others</h3>
                            <p>Git, GitHub, SDLC, Agile, Jira, Canvas</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
