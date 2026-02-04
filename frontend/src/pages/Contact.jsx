import { useState } from 'react'
import { HiStar, HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi'
import { toast } from 'react-toastify'
import axios from 'axios'
import { portfolioData } from '../data/portfolioData'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Simulate API call format or actual endpoint
            const response = await axios.post('/api/contacts', {
                ...formData,
                subject: 'Portfolio Contact' // Default subject
            })

            if (response.data.success) {
                toast.success(
                    <div className="flex items-center gap-2">
                        <HiStar className="text-yellow-400" />
                        <span>Message sent successfully!</span>
                    </div>
                )
                setFormData({ name: '', email: '', message: '' })
            }
        } catch (error) {
            console.error('Error:', error)
            toast.error('Failed to send message. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen pt-20">
            <section className="py-12 lg:py-20 max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header Title with Star */}
                <div className="relative mb-20 animate-fade-in">
                    <HiStar className="absolute -top-8 right-0 md:right-1/4 text-primary text-6xl animate-spin-slow" />
                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-display font-bold text-right leading-none">
                        Let's talk <br />
                        <span className="text-gray-700">business</span>
                    </h1>

                    <div className="hidden md:block absolute left-0 bottom-0 text-primary">
                        <svg width="100" height="20" viewBox="0 0 100 20" className="animate-pulse">
                            <path d="M0 10 L10 0 L20 10 L30 0 L40 10 L50 0 L60 10 L70 0 L80 10 L90 0 L100 10" fill="none" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left Column: Image & Info */}
                    <div className="space-y-12 animate-slide-in">
                        <div className="relative">
                            <div className="aspect-[4/5] bg-dark-800 rounded-none overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                                <img
                                    src="/images/hero.png"
                                    alt="Ashiph Ali"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Decorative Frame */}
                            <div className="absolute -bottom-4 -right-4 w-full h-full border border-white/10 -z-10"></div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold font-display">Contact Info</h2>
                            <div className="space-y-4 text-gray-400">
                                <a href={`mailto:${portfolioData.personal.email}`} className="flex items-center gap-4 hover:text-primary transition-colors">
                                    <span className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-full">
                                        <HiMail />
                                    </span>
                                    {portfolioData.personal.email}
                                </a>
                                <a href={`tel:${portfolioData.personal.phone}`} className="flex items-center gap-4 hover:text-primary transition-colors">
                                    <span className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-full">
                                        <HiPhone />
                                    </span>
                                    {portfolioData.personal.phone}
                                </a>
                                <div className="flex items-center gap-4">
                                    <span className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-full">
                                        <HiLocationMarker />
                                    </span>
                                    {portfolioData.personal.location}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="lg:pt-20 animate-fade-in">
                        <div className="mb-12">
                            <p className="text-2xl md:text-3xl font-light leading-relaxed text-gray-300">
                                If you have any dream project in your mind, <br />
                                <span className="text-white font-bold">let's make it happen together.</span>
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="group">
                                <label className="block text-sm text-gray-500 mb-2 group-focus-within:text-primary transition-colors">Full name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-transparent border-b border-white/20 py-4 text-lg focus:outline-none focus:border-primary transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="group">
                                <label className="block text-sm text-gray-500 mb-2 group-focus-within:text-primary transition-colors">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-transparent border-b border-white/20 py-4 text-lg focus:outline-none focus:border-primary transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div className="group">
                                <label className="block text-sm text-gray-500 mb-2 group-focus-within:text-primary transition-colors">What's on your mind?</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full bg-transparent border-b border-white/20 py-4 text-lg focus:outline-none focus:border-primary transition-colors resize-none"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-dark-800 hover:bg-dark-700 text-white py-4 px-8 rounded-none border border-white/10 hover:border-primary/50 transition-all duration-300 font-semibold tracking-wide disabled:opacity-50"
                            >
                                {loading ? 'Sending...' : 'Contact'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contact
