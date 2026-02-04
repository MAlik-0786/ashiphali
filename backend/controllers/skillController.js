import Skill from '../models/Skill.js';

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
export const getSkills = async (req, res, next) => {
    try {
        const skills = await Skill.find();

        res.status(200).json({
            success: true,
            count: skills.length,
            data: skills
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Add skill
// @route   POST /api/skills
// @access  Private
export const addSkill = async (req, res, next) => {
    try {
        req.body.user = req.user.id;

        const skill = await Skill.create(req.body);

        res.status(201).json({
            success: true,
            data: skill
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Update skill
// @route   PUT /api/skills/:id
// @access  Private
export const updateSkill = async (req, res, next) => {
    try {
        let skill = await Skill.findById(req.params.id);

        if (!skill) {
            return res.status(404).json({ success: false, message: 'Skill not found' });
        }

        if (req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Not authorized to update this skill' });
        }

        skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: skill });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Delete skill
// @route   DELETE /api/skills/:id
// @access  Private
export const deleteSkill = async (req, res, next) => {
    try {
        const skill = await Skill.findById(req.params.id);

        if (!skill) {
            return res.status(404).json({ success: false, message: 'Skill not found' });
        }

        if (req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Not authorized to delete this skill' });
        }

        await skill.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
