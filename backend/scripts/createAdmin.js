import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config({ path: '../.env' });

const createAdmin = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Check if admin exists
        const email = process.env.ADMIN_EMAIL || 'ashiph@ali.com';
        const password = process.env.ADMIN_PASSWORD || 'aliadminashiph123';

        const userExists = await User.findOne({ email });

        if (userExists) {
            console.log(`Admin user ${email} already exists`);
            process.exit(0);
        }

        // Create admin user
        const user = await User.create({
            email,
            password,
            role: 'admin'
        });

        console.log('Admin User Created Successfully!');
        console.log(`Email: ${email}`);
        console.log('Password: [HIDDEN]');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

createAdmin();
