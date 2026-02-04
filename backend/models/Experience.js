import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a job title'],
        trim: true
    },
    company: {
        type: String,
        required: [true, 'Please add a company name'],
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    from: {
        type: String, // e.g., "Jan 2021" or "2021"
        required: [true, 'Please add a start date']
    },
    to: {
        type: String, // e.g., "Present", "Dec 2023"
        required: [true, 'Please add an end date']
    },
    current: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;
