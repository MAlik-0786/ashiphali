import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Stat from '../models/Stat.js';
import Experience from '../models/Experience.js';

dotenv.config({ path: './.env' });

const portfolioData = {
    skills: {
        frontend: ["HTML", "CSS", "JavaScript", "Bootstrap", "TailwindCSS", "React.js"],
        backend: ["SQL", "Node.js", "Express.js", "MongoDB"],
        tools: ["Git", "GitHub", "SDLC", "Canvas", "Agile", "Jira", "Scrum"]
    },
    projects: [
        {
            title: "Cuisine - AI Recipe Generator",
            category: "Full Stack",
            description: "An AI-powered recipe generator web application that helps users find recipes based on selected ingredients.",
            longDescription: "Cuisine is an AI-powered recipe generator web application that helps users find recipes based on selected ingredients. The frontend is built using React with a responsive and intuitive user interface.",
            tech: ["React.js", "Node.js", "Express.js", "AI API", "MongoDB"],
            image: "https://res.cloudinary.com/dzagepohk/image/upload/v1770276414/cuisine_yyfcz0.png",
            link: "https://cuisine-recipe.netlify.app",
            github: "https://github.com/ashiphali/cuisine",
            featured: true
        },
        {
            title: "Skillbridge",
            category: "Full Stack",
            description: "A scalable skill-based service platform connecting customers with verified professionals.",
            longDescription: "Developed a scalable skill-based service platform connecting customers with verified professionals. Implemented role-based modules for Customers, Workers, and Admin.",
            tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Razorpay"],
            image: "https://res.cloudinary.com/dzagepohk/image/upload/v1770231383/skillbridgelogo_ojce3c.png",
            link: "https://skillbridge-livid.vercel.app/",
            github: "https://github.com/ashiphali/skillbridge",
            featured: true
        },
        {
            title: "StyleHub",
            category: "Full Stack",
            description: "E-commerce website with admin panel using the MERN stack.",
            longDescription: "Built a full-stack e-commerce application with an admin panel using the MERN stack. Implemented product management, cart, checkout with GST & shipping.",
            tech: ["React.js", "CSS3", "JavaScript", "Netlify"],
            image: "https://res.cloudinary.com/dzagepohk/image/upload/v1770230990/stylehub_weyzbq.jpg",
            link: "https://stylehub-frontend-8len.onrender.com/",
            github: "https://github.com/ashiphali/stylehub",
            featured: true
        }
    ],
    stats: [
        { label: 'Projects Completed', value: '10+', order: 1 },
        { label: 'Years Experience', value: '3+', order: 2 },
        { label: 'Happy Clients', value: '5+', order: 3 },
        { label: 'Technologies', value: '15+', order: 4 }
    ],
    experiences: [
        {
            title: "Full Stack Developer",
            company: "Freelance",
            location: "Remote",
            from: "2022",
            to: "Present",
            description: "Developing custom web solutions for various clients using MERN stack."
        },
        {
            title: "Digital Product Designer",
            company: "Design Studio",
            location: "Delhi, India",
            from: "2021",
            to: "2022",
            description: "Focused on UI/UX design and prototyping for mobile and web apps."
        }
    ]
};

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB for seeding...');

        // 1. Ensure Admin User
        const email = process.env.ADMIN_EMAIL || 'ashiph@ali.com';
        let admin = await User.findOne({ email });
        if (!admin) {
            admin = await User.create({
                email,
                password: process.env.ADMIN_PASSWORD || 'aliadminashiph123',
                role: 'admin'
            });
            console.log('👤 Admin user created');
        }

        // Clear existing data
        await Project.deleteMany({});
        await Skill.deleteMany({});
        await Stat.deleteMany({});
        await Experience.deleteMany({});
        console.log('🗑️  Cleared existing collections');

        // 2. Seed Projects
        const projectData = portfolioData.projects.map(p => ({ ...p, user: admin._id }));
        await Project.create(projectData);
        console.log(`🚀 Seeded ${projectData.length} projects`);

        // 3. Seed Skills
        const skillEntries = [];
        Object.entries(portfolioData.skills).forEach(([category, skills]) => {
            skills.forEach(name => {
                skillEntries.push({
                    name,
                    category: category.charAt(0).toUpperCase() + category.slice(1),
                    level: 80 + Math.floor(Math.random() * 20),
                    user: admin._id
                });
            });
        });
        await Skill.create(skillEntries);
        console.log(`🛠️  Seeded ${skillEntries.length} skills`);

        // 4. Seed Stats
        const statData = portfolioData.stats.map(s => ({ ...s, user: admin._id }));
        await Stat.create(statData);
        console.log(`📊 Seeded ${statData.length} stats`);

        // 5. Seed Experiences
        const expData = portfolioData.experiences.map(e => ({ ...e, user: admin._id }));
        await Experience.create(expData);
        console.log(`📅 Seeded ${expData.length} experiences`);

        console.log('🌟 Seeding completed successfully!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding failed:', err);
        process.exit(1);
    }
};

seedData();
