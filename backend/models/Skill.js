import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a skill name'],
        trim: true,
        unique: true
    },
    category: {
        type: String,
        required: [true, 'Please select a category'],
        enum: ['Frontend', 'Backend', 'Tools', 'Other']
    },
    level: {
        type: Number, // Percentage, e.g., 80
        min: 0,
        max: 100
    },
    image: {
        type: String, // Icon URL or class name
        default: 'no-icon.png'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;
