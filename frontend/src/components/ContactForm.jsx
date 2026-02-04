import { useState } from 'react'
import { toast } from 'react-toastify'
import { HiUser, HiMail, HiPhone, HiPencil, HiChatAlt2 } from 'react-icons/hi'
import axios from 'axios'
import './ContactForm.css'

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    })
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const validate = () => {
        const newErrors = {}

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required'
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters'
        }

        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email'
        }

        if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number'
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required'
        } else if (formData.subject.trim().length < 3) {
            newErrors.subject = 'Subject must be at least 3 characters'
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required'
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validate()) {
            toast.error('Please fix the errors in the form')
            return
        }

        setLoading(true)

        try {
            const response = await axios.post('/api/contacts', formData)

            if (response.data.success) {
                toast.success(response.data.message || 'Message sent successfully!')
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                })
                setErrors({})
            }
        } catch (error) {
            console.error('Error submitting form:', error)

            if (error.response?.data?.errors) {
                toast.error(error.response.data.errors.join(', '))
            } else {
                toast.error(error.response?.data?.message || 'Failed to send message. Please try again.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="contact-form-wrapper">
            <div className="contact-form-header">
                <h2 className="contact-form-title">
                    Get In <span className="text-gradient">Touch</span>
                </h2>
                <p className="contact-form-subtitle">
                    Have a project in mind or just want to say hello? Drop me a message!
                </p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">
                            <HiUser /> Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`form-input ${errors.name ? 'error' : ''}`}
                            placeholder="John Doe"
                        />
                        {errors.name && <span className="form-error">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            <HiMail /> Email *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`form-input ${errors.email ? 'error' : ''}`}
                            placeholder="john@example.com"
                        />
                        {errors.email && <span className="form-error">{errors.email}</span>}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="phone" className="form-label">
                            <HiPhone /> Phone
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`form-input ${errors.phone ? 'error' : ''}`}
                            placeholder="+1 234 567 8900"
                        />
                        {errors.phone && <span className="form-error">{errors.phone}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="subject" className="form-label">
                            <HiPencil /> Subject *
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className={`form-input ${errors.subject ? 'error' : ''}`}
                            placeholder="Project Inquiry"
                        />
                        {errors.subject && <span className="form-error">{errors.subject}</span>}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="message" className="form-label">
                        <HiChatAlt2 /> Message *
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className={`form-textarea ${errors.message ? 'error' : ''}`}
                        placeholder="Tell me about your project..."
                        rows="6"
                    />
                    {errors.message && <span className="form-error">{errors.message}</span>}
                </div>

                <button
                    type="submit"
                    className="btn btn-primary btn-submit"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span className="spinner"></span>
                            Sending...
                        </>
                    ) : (
                        'Send Message'
                    )}
                </button>
            </form>
        </div>
    )
}

export default ContactForm
