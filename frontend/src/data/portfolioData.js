// Portfolio data extracted from ashiphali.netlify.app
export const portfolioData = {
    personal: {
        name: "Ashiph Ali",
        title: "Digital Product Designer",
        subtitle: "Full Stack Developer",
        tagline: "I am passionate about crafting intuitive and visually appealing user experiences that leave a lasting impact.",
        experience: "With five years of experience in the industry, I have honed my skills in translating complex ideas into delightful, user-centric designs.",
        email: "contact@ashiphali.com",
        phone: "+91 1234567890",
        location: "India",
    },

    skills: {
        frontend: [
            "HTML",
            "CSS",
            "JavaScript",
            "Bootstrap",
            "TailwindCSS",
            "React.js"
        ],
        backend: [
            "SQL",
            "Node.js",
            "Express.js",
            "MongoDB"
        ],
        tools: [
            "Git",
            "GitHub",
            "SDLC",
            "Canvas",
            "Agile",
            "Jira",
            "MERN Stack"
        ]
    },

    projects: [
        {
            id: 1,
            title: "Cuisine - AI Recipe Generator",
            category: "Web Application",
            description: "An AI-powered recipe generator web application that helps users find recipes based on selected ingredients. Built with React and integrated with AI APIs for smart recipe recommendations.",
            longDescription: "Cuisine is an AI-powered recipe generator web application that helps users find recipes based on selected ingredients. The frontend is built using React with a responsive and intuitive user interface. Users can search and select ingredients to generate personalized recipe suggestions. The backend is developed with Node.js and Express to handle API requests securely. AI APIs are integrated to provide smart and dynamic recipe recommendations. The application follows a clean component-based architecture for scalability.",
            tech: ["React.js", "Node.js", "Express.js", "AI API", "MongoDB"],
            image: "/images/project-bg-1.png",
            link: "https://cuisine-recipe.netlify.app",
            github: "https://github.com/ashiphali/cuisine",
            featured: true
        },
        {
            id: 2,
            title: "Skillbridge",
            category: "Service Platform",
            description: "A scalable skill-based service platform connecting customers with verified professionals. Features role-based modules, payment integration, and automated payouts.",
            longDescription: "Developed a scalable skill-based service platform connecting customers with verified professionals. Implemented role-based modules for Customers, Workers, and Admin with secure service booking and Razorpay payment integration. Built worker profiles, smart wallet for earnings tracking, and automated Bank/UPI payouts. Designed an admin dashboard for KYC verification, financial management, and analytics. Implemented Google OAuth, JWT, and OTP-based authentication.",
            tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Razorpay"],
            image: "/images/project-bg-2.png",
            link: "https://skillbridge-livid.vercel.app/",
            github: "https://github.com/ashiphali/skillbridge",
            featured: true
        },
        {
            id: 3,
            title: "Portfolio Website",
            category: "Personal Website",
            description: "Modern portfolio website showcasing projects and skills with a dark, minimalist design aesthetic.",
            longDescription: "A modern, responsive portfolio website built with React and styled with custom CSS. Features smooth animations, dark theme, and optimized performance.",
            tech: ["React.js", "CSS3", "JavaScript", "Netlify"],
            image: "/images/project-bg-1.png",
            link: "https://ashiphali.netlify.app/",
            github: "https://github.com/ashiphali/portfolio",
            featured: false
        },
        {
            id: 4,
            title: "Contact Management System",
            category: "Web Application",
            description: "Full-stack MERN application for managing contact form submissions with admin dashboard.",
            longDescription: "A complete contact management system built with MERN stack. Features include contact form with validation, admin dashboard for managing submissions, status tracking, and statistics.",
            tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
            image: "/images/project-bg-2.png",
            link: "#",
            github: "https://github.com/ashiphali/contact-app",
            featured: false
        }
    ],

    social: {
        github: "https://github.com/ashiphali",
        linkedin: "https://linkedin.com/in/ashiphali",
        twitter: "https://twitter.com/ashiphali",
        instagram: "https://instagram.com/ashiphali"
    },

    stats: {
        projectsCompleted: "50+",
        yearsExperience: "3+",
        happyClients: "30+",
        technologies: "15+"
    }
};

export default portfolioData;
