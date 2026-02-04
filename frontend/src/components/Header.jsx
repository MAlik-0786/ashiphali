import { Link, useLocation } from 'react-router-dom'
import { HiMenu, HiX } from 'react-icons/hi'
import { useState, useEffect } from 'react'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setIsMenuOpen(false)
    }, [location])

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/projects', label: 'Work' },
        { path: '/contact', label: 'Blog' },
        { path: '/admin', label: 'Hire me' }
    ]

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-dark-900/80 backdrop-blur-md border-b border-dark-600' : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <nav className="flex items-center justify-between py-5">
                    <Link to="/" className="font-display text-2xl font-bold group">
                        <span className="text-white">Ashiph</span>
                        <span className="text-gradient ml-1">Ali</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`relative text-sm font-medium transition-colors duration-200 ${location.pathname === link.path
                                        ? 'text-primary'
                                        : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {link.label}
                                {location.pathname === link.path && (
                                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-green-400"></span>
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-white hover:text-primary transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                    </button>
                </nav>

                {/* Mobile Navigation */}
                <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                    <div className="py-4 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`block text-lg font-medium transition-colors duration-200 ${location.pathname === link.path
                                        ? 'text-primary'
                                        : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
