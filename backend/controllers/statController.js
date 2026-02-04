import Stat from '../models/Stat.js';

// @desc    Get all stats
// @route   GET /api/stats
// @access  Public
export const getStats = async (req, res, next) => {
    try {
        const stats = await Stat.find().sort({ order: 1 });

        res.status(200).json({
            success: true,
            count: stats.length,
            data: stats
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Add stat
// @route   POST /api/stats
// @access  Private/Admin
export const addStat = async (req, res, next) => {
    try {
        req.body.user = req.user.id;
        const stat = await Stat.create(req.body);

        res.status(201).json({
            success: true,
            data: stat
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Update stat
// @route   PUT /api/stats/:id
// @access  Private/Admin
export const updateStat = async (req, res, next) => {
    try {
        let stat = await Stat.findById(req.params.id);

        if (!stat) {
            return res.status(404).json({ success: false, message: 'Stat not found' });
        }

        if (req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }

        stat = await Stat.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: stat });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Delete stat
// @route   DELETE /api/stats/:id
// @access  Private/Admin
export const deleteStat = async (req, res, next) => {
    try {
        const stat = await Stat.findById(req.params.id);

        if (!stat) {
            return res.status(404).json({ success: false, message: 'Stat not found' });
        }

        if (req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }

        await stat.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
