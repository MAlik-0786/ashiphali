import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import {
    HiMail, HiPhone, HiCalendar, HiEye, HiTrash,
    HiRefresh, HiFilter, HiChartBar
} from 'react-icons/hi'
import axios from 'axios'
import './Admin.css'

const Admin = () => {
    const [contacts, setContacts] = useState([])
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('all')
    const [selectedContact, setSelectedContact] = useState(null)

    useEffect(() => {
        fetchContacts()
        fetchStats()
    }, [filter])

    const fetchContacts = async () => {
        setLoading(true)
        try {
            const url = filter === 'all'
                ? '/api/contacts'
                : `/api/contacts?status=${filter}`

            const response = await axios.get(url)

            if (response.data.success) {
                setContacts(response.data.data)
            }
        } catch (error) {
            console.error('Error fetching contacts:', error)
            toast.error('Failed to load contacts')
        } finally {
            setLoading(false)
        }
    }

    const fetchStats = async () => {
        try {
            const response = await axios.get('/api/contacts/stats/summary')
            if (response.data.success) {
                setStats(response.data.data)
            }
        } catch (error) {
            console.error('Error fetching stats:', error)
        }
    }

    const updateStatus = async (id, newStatus) => {
        try {
            const response = await axios.patch(`/api/contacts/${id}/status`, {
                status: newStatus
            })

            if (response.data.success) {
                toast.success('Status updated successfully')
                fetchContacts()
                fetchStats()
                if (selectedContact?._id === id) {
                    setSelectedContact(response.data.data)
                }
            }
        } catch (error) {
            console.error('Error updating status:', error)
            toast.error('Failed to update status')
        }
    }

    const deleteContact = async (id) => {
        if (!window.confirm('Are you sure you want to delete this contact?')) {
            return
        }

        try {
            const response = await axios.delete(`/api/contacts/${id}`)

            if (response.data.success) {
                toast.success('Contact deleted successfully')
                fetchContacts()
                fetchStats()
                if (selectedContact?._id === id) {
                    setSelectedContact(null)
                }
            }
        } catch (error) {
            console.error('Error deleting contact:', error)
            toast.error('Failed to delete contact')
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <div className="admin-page">
            <div className="container">
                <div className="admin-header">
                    <div>
                        <h1 className="admin-title">
                            Contact <span className="text-gradient">Dashboard</span>
                        </h1>
                        <p className="admin-subtitle">Manage all contact form submissions</p>
                    </div>
                    <button
                        className="btn btn-secondary"
                        onClick={() => {
                            fetchContacts()
                            fetchStats()
                        }}
                    >
                        <HiRefresh /> Refresh
                    </button>
                </div>

                {stats && (
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon">
                                <HiChartBar />
                            </div>
                            <div className="stat-content">
                                <div className="stat-value">{stats.total}</div>
                                <div className="stat-label">Total Contacts</div>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon new">
                                <HiMail />
                            </div>
                            <div className="stat-content">
                                <div className="stat-value">{stats.new}</div>
                                <div className="stat-label">New Messages</div>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon read">
                                <HiEye />
                            </div>
                            <div className="stat-content">
                                <div className="stat-value">{stats.read}</div>
                                <div className="stat-label">Read</div>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon replied">
                                <HiMail />
                            </div>
                            <div className="stat-content">
                                <div className="stat-value">{stats.replied}</div>
                                <div className="stat-label">Replied</div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="filter-bar">
                    <HiFilter />
                    <button
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={`filter-btn ${filter === 'new' ? 'active' : ''}`}
                        onClick={() => setFilter('new')}
                    >
                        New
                    </button>
                    <button
                        className={`filter-btn ${filter === 'read' ? 'active' : ''}`}
                        onClick={() => setFilter('read')}
                    >
                        Read
                    </button>
                    <button
                        className={`filter-btn ${filter === 'replied' ? 'active' : ''}`}
                        onClick={() => setFilter('replied')}
                    >
                        Replied
                    </button>
                    <button
                        className={`filter-btn ${filter === 'archived' ? 'active' : ''}`}
                        onClick={() => setFilter('archived')}
                    >
                        Archived
                    </button>
                </div>

                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading contacts...</p>
                    </div>
                ) : contacts.length === 0 ? (
                    <div className="empty-state">
                        <HiMail size={64} />
                        <h3>No contacts found</h3>
                        <p>There are no contact submissions yet.</p>
                    </div>
                ) : (
                    <div className="contacts-grid">
                        <div className="contacts-list">
                            {contacts.map((contact) => (
                                <div
                                    key={contact._id}
                                    className={`contact-item ${selectedContact?._id === contact._id ? 'active' : ''}`}
                                    onClick={() => setSelectedContact(contact)}
                                >
                                    <div className="contact-item-header">
                                        <h3>{contact.name}</h3>
                                        <span className={`status-badge ${contact.status}`}>
                                            {contact.status}
                                        </span>
                                    </div>
                                    <p className="contact-item-subject">{contact.subject}</p>
                                    <div className="contact-item-meta">
                                        <span><HiMail /> {contact.email}</span>
                                        <span><HiCalendar /> {formatDate(contact.createdAt)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {selectedContact && (
                            <div className="contact-detail">
                                <div className="contact-detail-header">
                                    <h2>{selectedContact.name}</h2>
                                    <div className="contact-actions">
                                        <select
                                            value={selectedContact.status}
                                            onChange={(e) => updateStatus(selectedContact._id, e.target.value)}
                                            className="status-select"
                                        >
                                            <option value="new">New</option>
                                            <option value="read">Read</option>
                                            <option value="replied">Replied</option>
                                            <option value="archived">Archived</option>
                                        </select>
                                        <button
                                            className="btn-icon btn-danger"
                                            onClick={() => deleteContact(selectedContact._id)}
                                            title="Delete"
                                        >
                                            <HiTrash />
                                        </button>
                                    </div>
                                </div>

                                <div className="contact-detail-info">
                                    <div className="info-item">
                                        <HiMail />
                                        <div>
                                            <div className="info-label">Email</div>
                                            <a href={`mailto:${selectedContact.email}`} className="info-value">
                                                {selectedContact.email}
                                            </a>
                                        </div>
                                    </div>

                                    {selectedContact.phone && (
                                        <div className="info-item">
                                            <HiPhone />
                                            <div>
                                                <div className="info-label">Phone</div>
                                                <a href={`tel:${selectedContact.phone}`} className="info-value">
                                                    {selectedContact.phone}
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    <div className="info-item">
                                        <HiCalendar />
                                        <div>
                                            <div className="info-label">Received</div>
                                            <div className="info-value">{formatDate(selectedContact.createdAt)}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="contact-detail-content">
                                    <h3>Subject</h3>
                                    <p className="subject-text">{selectedContact.subject}</p>

                                    <h3>Message</h3>
                                    <p className="message-text">{selectedContact.message}</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Admin
