import { Link, useLocation } from 'react-router-dom'
import { HiMenu, HiX } from 'react-icons/hi'
import { useState, useEffect, useMemo } from 'react'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
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
        setIsLoggedIn(!!localStorage.getItem('token'))
    }, [location])

    const navLinks = useMemo(() => [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/projects', label: 'Work' },
        { path: '/contact', label: 'Contact' }
    ], [])

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-dark-900/80 backdrop-blur-md border-b border-dark-600' : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <nav className="flex items-center justify-between py-5">
                    <Link to="/" className="font-display text-2xl font-bold group">
                        <span className="text-white">𝓐𝓼𝓱𝓲𝓹𝓱</span>
                        <span className="text-gradient ml-1">𝓪𝓵𝓲</span>
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
                                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-linear-to-r from-primary to-green-400"></span>

                                )}
                            </Link>
                        ))}

                        {isLoggedIn ? (
                            <Link
                                to="/admin"
                                className="px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold hover:bg-primary hover:text-dark-900 transition-all duration-300"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                to="/login"
                                className="px-5 py-2 rounded-full border border-white/10 text-gray-400 text-sm font-semibold hover:border-primary hover:text-primary transition-all duration-300"
                            >
                                Login
                            </Link>
                        )}
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
                        <Link
                            to={isLoggedIn ? "/admin" : "/login"}
                            className="block text-lg font-medium text-primary"
                        >
                            {isLoggedIn ? "Dashboard" : "Admin Login"}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
