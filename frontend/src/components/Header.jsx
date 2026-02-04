import { Link } from 'react-router-dom'
import { HiMenu, HiX } from 'react-icons/hi'
import { useState } from 'react'
import './Header.css'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="header">
            <div className="container">
                <nav className="nav">
                    <Link to="/" className="logo">
                        <span className="logo-text">Ashiph</span>
                        <span className="logo-accent">Ali</span>
                    </Link>

                    <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                        <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                            Home
                        </Link>
                        <Link to="/admin" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                            Admin
                        </Link>
                    </div>

                    <button
                        className="menu-toggle"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                    </button>
                </nav>
            </div>
        </header>
    )
}

export default Header
