import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config(); // Adjust path based on execution location

const createAdmin = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Check if admin exists
        const userExists = await User.findOne({ email: 'admin@example.com' });

        if (userExists) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        // Create admin user
        const user = await User.create({
            email: 'admin@example.com',
            password: 'password123',
            role: 'admin'
        });

        console.log('Presidio Admin User Created!');
        console.log('Email: admin@example.com');
        console.log('Password: password123');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

createAdmin();
