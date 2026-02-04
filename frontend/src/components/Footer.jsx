import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3 className="footer-title">Ashiph Ali</h3>
                        <p className="footer-text">
                            Full Stack Developer specializing in MERN stack development.
                            Building modern, scalable web applications.
                        </p>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-subtitle">Quick Links</h4>
                        <div className="footer-links">
                            <a href="https://ashiphali.netlify.app/" target="_blank" rel="noopener noreferrer">
                                Portfolio
                            </a>
                            <a href="https://skillbridge-livid.vercel.app/" target="_blank" rel="noopener noreferrer">
                                Skillbridge
                            </a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-subtitle">Connect</h4>
                        <div className="social-links">
                            <a href="https://github.com/ashiphali" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <FaGithub size={20} />
                            </a>
                            <a href="https://linkedin.com/in/ashiphali" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <FaLinkedin size={20} />
                            </a>
                            <a href="https://twitter.com/ashiphali" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <FaTwitter size={20} />
                            </a>
                            <a href="mailto:contact@ashiphali.com" aria-label="Email">
                                <FaEnvelope size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© {currentYear} Ashiph Ali. All rights reserved.</p>
                    <p className="footer-credit">
                        Built with <span className="heart">♥</span> using MERN Stack
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
