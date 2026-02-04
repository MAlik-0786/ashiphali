import mongoose from 'mongoose';

const statSchema = new mongoose.Schema({
    label: {
        type: String,
        required: [true, 'Please add a label'],
        trim: true
    },
    value: {
        type: String,
        required: [true, 'Please add a value'],
        trim: true
    },
    order: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const Stat = mongoose.model('Stat', statSchema);

export default Stat;
