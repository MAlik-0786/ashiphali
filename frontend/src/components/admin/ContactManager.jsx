import { useState, useEffect } from 'react'
import axios from 'axios'
import api from '../../utils/api' // Use api instance for auth headers
import { toast } from 'react-toastify'
import {
    HiRefresh,
    HiTrash,
    HiCheckCircle,
    HiMail,
    HiPhone,
    HiCalendar,
    HiInbox,
    HiEye,
    HiArchive,
    HiReply,
    HiArrowRight
} from 'react-icons/hi'

const ContactManager = () => {
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('all')
    const [stats, setStats] = useState({ total: 0, new: 0, read: 0, replied: 0 })
    const [selectedContact, setSelectedContact] = useState(null)

    const fetchContacts = async () => {
        setLoading(true)
        try {
            // Use 'api' instead of 'axios' to send token if needed (though contact GET was public, maybe protect it now?)
            // I'll use api just in case I protect it later.
            const response = await api.get('/api/contacts')
            const allContacts = response.data.data || []
            setContacts(allContacts)

            setStats({
                total: allContacts.length,
                new: allContacts.filter(c => c.status === 'new').length,
                read: allContacts.filter(c => c.status === 'read').length,
                replied: allContacts.filter(c => c.status === 'replied').length
            })
        } catch (error) {
            toast.error('Failed to load contacts')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchContacts()
    }, [])

    const handleUpdateStatus = async (id, status) => {
        try {
            await api.patch(`/api/contacts/${id}/status`, { status })
            toast.success(`Status updated to ${status}`)
            fetchContacts()
            if (selectedContact && selectedContact._id === id) {
                setSelectedContact({ ...selectedContact, status })
            }
        } catch (error) {
            toast.error('Failed to update status')
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this contact?')) return

        try {
            await api.delete(`/api/contacts/${id}`)
            toast.success('Contact deleted successfully')
            fetchContacts()
            if (selectedContact && selectedContact._id === id) {
                setSelectedContact(null)
            }
        } catch (error) {
            toast.error('Failed to delete contact')
        }
    }

    const filteredContacts = filter === 'all'
        ? contacts
        : contacts.filter(c => c.status === filter)

    const getStatusColor = (status) => {
        switch (status) {
            case 'new': return 'bg-green-500/20 text-green-400 border-green-500/50'
            case 'read': return 'bg-blue-500/20 text-blue-400 border-blue-500/50'
            case 'replied': return 'bg-purple-500/20 text-purple-400 border-purple-500/50'
            case 'archived': return 'bg-gray-500/20 text-gray-400 border-gray-500/50'
            default: return 'bg-gray-500/20 text-gray-400'
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 animate-fade-in">
                <div>
                    <h2 className="text-2xl font-bold font-display">Message Inbox</h2>
                    <p className="text-gray-400">Manage your contact form submissions</p>
                </div>
                <button
                    onClick={fetchContacts}
                    className="flex items-center gap-2 px-4 py-2 bg-dark-800 border border-white/10 rounded-lg hover:bg-dark-700 hover:border-primary/50 transition-all duration-300"
                >
                    <HiRefresh className={loading ? 'animate-spin' : ''} />
                    Refresh
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Total Messages', value: stats.total, color: 'text-white' },
                    { label: 'New Messages', value: stats.new, color: 'text-green-400' },
                    { label: 'Read', value: stats.read, color: 'text-blue-400' },
                    { label: 'Replied', value: stats.replied, color: 'text-purple-400' }
                ].map((stat, index) => (
                    <div key={index} className="p-4 bg-dark-900 border border-white/10 rounded-xl">
                        <div className={`text-2xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Contact List */}
                <div className="lg:col-span-1 space-y-4">
                    {/* Filters */}
                    <div className="flex flex-wrap gap-2">
                        {['all', 'new', 'read', 'replied', 'archived'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-3 py-1.5 rounded-lg text-xs capitalize transition-all duration-300 ${filter === f
                                    ? 'bg-primary text-dark-900 font-semibold'
                                    : 'bg-dark-800 text-gray-400 hover:text-white'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    <div className="bg-dark-900 border border-white/10 rounded-2xl overflow-hidden max-h-[600px] overflow-y-auto">
                        {loading ? (
                            <div className="p-8 text-center">
                                <div className="spinner w-8 h-8 mb-4"></div>
                                <p className="text-gray-500">Loading contacts...</p>
                            </div>
                        ) : filteredContacts.length === 0 ? (
                            <div className="p-12 text-center">
                                <HiInbox className="text-4xl text-gray-600 mx-auto mb-4" />
                                <p className="text-gray-500">No contacts found</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-white/5">
                                {filteredContacts.map((contact) => (
                                    <div
                                        key={contact._id}
                                        onClick={() => {
                                            setSelectedContact(contact)
                                            if (contact.status === 'new') handleUpdateStatus(contact._id, 'read')
                                        }}
                                        className={`p-4 cursor-pointer hover:bg-white/5 transition-colors ${selectedContact?._id === contact._id ? 'bg-white/5 border-l-2 border-primary' : ''
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className={`font-semibold text-sm ${contact.status === 'new' ? 'text-white' : 'text-gray-400'}`}>
                                                {contact.name}
                                            </h3>
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getStatusColor(contact.status)}`}>
                                                {contact.status}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 line-clamp-1 mb-2">{contact.subject}</p>
                                        <div className="flex justify-between items-center text-[10px] text-gray-600">
                                            <span>{new Date(contact.createdAt).toLocaleDateString()}</span>
                                            <HiArrowRight />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Contact Details */}
                <div className="lg:col-span-2">
                    {selectedContact ? (
                        <div className="bg-dark-900 border border-white/10 rounded-2xl p-6 animate-fade-in sticky top-24">
                            <div className="flex justify-between items-start mb-6 gap-4">
                                <div>
                                    <h2 className="text-xl font-bold mb-2">{selectedContact.subject}</h2>
                                    <div className="flex flex-wrap items-center gap-4 text-gray-400 text-xs">
                                        <span className="flex items-center gap-2">
                                            <HiCalendar className="text-primary" />
                                            {new Date(selectedContact.createdAt).toLocaleString()}
                                        </span>
                                        <span className={`px-2 py-0.5 rounded border ${getStatusColor(selectedContact.status)}`}>
                                            {selectedContact.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleDelete(selectedContact._id)}
                                        className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                                        title="Delete"
                                    >
                                        <HiTrash size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4 mb-6 p-4 bg-dark-800 rounded-xl">
                                <div>
                                    <label className="text-xs text-gray-500 block mb-1">From</label>
                                    <div className="font-semibold">{selectedContact.name}</div>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 block mb-1">Contact</label>
                                    <div className="flex flex-col gap-1 text-sm">
                                        <a href={`mailto:${selectedContact.email}`} className="flex items-center gap-2 hover:text-primary">
                                            <HiMail /> {selectedContact.email}
                                        </a>
                                        {selectedContact.phone && (
                                            <a href={`tel:${selectedContact.phone}`} className="flex items-center gap-2 hover:text-primary">
                                                <HiPhone /> {selectedContact.phone}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="text-xs text-gray-500 block mb-2 uppercase tracking-wider font-semibold">Message</label>
                                <div className="p-4 bg-dark-800 rounded-xl text-gray-300 leading-relaxed whitespace-pre-wrap text-sm">
                                    {selectedContact.message}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                                <button
                                    onClick={() => handleUpdateStatus(selectedContact._id, 'read')}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors text-xs"
                                >
                                    <HiEye /> Mark Read
                                </button>
                                <button
                                    onClick={() => handleUpdateStatus(selectedContact._id, 'replied')}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500 hover:text-white transition-colors text-xs"
                                >
                                    <HiReply /> Mark Replied
                                </button>
                                <button
                                    onClick={() => handleUpdateStatus(selectedContact._id, 'archived')}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-500/10 text-gray-400 hover:bg-gray-500 hover:text-white transition-colors text-xs"
                                >
                                    <HiArchive /> Archive
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500 min-h-[300px] border border-dashed border-white/10 rounded-2xl">
                            <HiInbox className="text-5xl mb-3 opacity-20" />
                            <p>Select a contact to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ContactManager
