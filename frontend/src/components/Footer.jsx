import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { portfolioData } from '../data/portfolioData'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-dark-900 pt-20 pb-10 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-12 mb-20">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="inline-block mb-6">
                            <h2 className="text-3xl font-display font-bold">
                                Ashiph<br />
                                <span className="text-green-500">Ali</span>
                            </h2>
                        </Link>
                        <p className="text-gray-400 max-w-sm mb-6">
                            <a href={`mailto:${portfolioData.personal.email}`} className="text-primary hover:underline">
                                {portfolioData.personal.email}
                            </a>
                        </p>
                    </div>

                    {/* Explore */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">Explore</h3>
                        <ul className="space-y-4">
                            <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                            <li><Link to="/projects" className="text-gray-400 hover:text-white transition-colors">Work</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">Social</h3>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href={portfolioData.social.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                                >
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <a
                                    href={portfolioData.social.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                                >
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <a
                                    href={portfolioData.social.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                                >
                                    Twitter
                                </a>
                            </li>

                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {currentYear} Ashiph Ali. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
