import Experience from '../models/Experience.js';

// @desc    Get all experiences
// @route   GET /api/experiences
// @access  Public
export const getExperiences = async (req, res, next) => {
    try {
        // Sort by newest first (descending order of timestamps or end date logic)
        const experiences = await Experience.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: experiences.length,
            data: experiences
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Add experience
// @route   POST /api/experiences
// @access  Private/Admin
export const addExperience = async (req, res, next) => {
    try {
        req.body.user = req.user.id;
        const experience = await Experience.create(req.body);

        res.status(201).json({
            success: true,
            data: experience
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Update experience
// @route   PUT /api/experiences/:id
// @access  Private/Admin
export const updateExperience = async (req, res, next) => {
    try {
        let experience = await Experience.findById(req.params.id);

        if (!experience) {
            return res.status(404).json({ success: false, message: 'Experience not found' });
        }

        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }

        experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: experience });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Delete experience
// @route   DELETE /api/experiences/:id
// @access  Private/Admin
export const deleteExperience = async (req, res, next) => {
    try {
        const experience = await Experience.findById(req.params.id);

        if (!experience) {
            return res.status(404).json({ success: false, message: 'Experience not found' });
        }

        if (req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }

        await experience.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
