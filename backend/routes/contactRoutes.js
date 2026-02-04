import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// @route   POST /api/contacts
// @desc    Submit a new contact form
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        // Get IP and User Agent for tracking
        const ipAddress = req.ip || req.connection.remoteAddress;
        const userAgent = req.get('user-agent');

        // Create new contact
        const newContact = new Contact({
            name,
            email,
            phone,
            subject,
            message,
            ipAddress,
            userAgent
        });

        const savedContact = await newContact.save();

        res.status(201).json({
            success: true,
            message: 'Thank you for contacting! We will get back to you soon.',
            data: {
                id: savedContact._id,
                name: savedContact.name,
                email: savedContact.email,
                createdAt: savedContact.createdAt
            }
        });
    } catch (error) {
        console.error('Error saving contact:', error);

        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to submit contact form. Please try again later.'
        });
    }
});

// @route   GET /api/contacts
// @desc    Get all contacts (Admin)
// @access  Public (Should be protected in production)
router.get('/', async (req, res) => {
    try {
        const { status, page = 1, limit = 10 } = req.query;

        const query = status ? { status } : {};
        const skip = (page - 1) * limit;

        const contacts = await Contact.find(query)
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip(skip);

        const total = await Contact.countDocuments(query);

        res.json({
            success: true,
            data: contacts,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit),
                limit: parseInt(limit)
            }
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch contacts'
        });
    }
});

// @route   GET /api/contacts/:id
// @desc    Get single contact by ID
// @access  Public (Should be protected in production)
router.get('/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        res.json({
            success: true,
            data: contact
        });
    } catch (error) {
        console.error('Error fetching contact:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch contact'
        });
    }
});

// @route   PATCH /api/contacts/:id/status
// @desc    Update contact status
// @access  Public (Should be protected in production)
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;

        if (!['new', 'read', 'replied', 'archived'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value'
            });
        }

        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        res.json({
            success: true,
            message: 'Status updated successfully',
            data: contact
        });
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update status'
        });
    }
});

// @route   DELETE /api/contacts/:id
// @desc    Delete a contact
// @access  Public (Should be protected in production)
router.delete('/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        res.json({
            success: true,
            message: 'Contact deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete contact'
        });
    }
});

// @route   GET /api/contacts/stats/summary
// @desc    Get contact statistics
// @access  Public (Should be protected in production)
router.get('/stats/summary', async (req, res) => {
    try {
        const total = await Contact.countDocuments();
        const newContacts = await Contact.countDocuments({ status: 'new' });
        const read = await Contact.countDocuments({ status: 'read' });
        const replied = await Contact.countDocuments({ status: 'replied' });
        const archived = await Contact.countDocuments({ status: 'archived' });

        res.json({
            success: true,
            data: {
                total,
                new: newContacts,
                read,
                replied,
                archived
            }
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch statistics'
        });
    }
});

export default router;
