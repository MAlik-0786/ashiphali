// Portfolio data extracted from ashiphali.netlify.app
export const portfolioData = {
    personal: {
        name: "Ashiph Ali",
        title: "Digital Product Designer",
        subtitle: "Full Stack Developer",
        tagline: "hey there! i'am Ashiph Ali, a full stack developer and a digital product designer. I am passionate about crafting intuitive and visually appealing user experiences that leave a lasting impact.",
        experience: "I have honed my skills in translating complex ideas into delightful, user-centric designs.",
        email: "malikasiph786@gmail.com",
        phone: "+91 9889858173",
        location: "India, Delhi",
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
            "MongoDB",

        ],
        tools: [
            "Git",
            "GitHub",
            "SDLC",
            "Canvas",
            "Agile",
            "Jira",
            "Scrum",

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
            image: "https://res.cloudinary.com/dzagepohk/image/upload/v1768327606/worker-profiles/oy51n2um5mhrkusy9l9p.jpg" || "/images/project-bg-1.png",
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
            image: "    https://res.cloudinary.com/dzagepohk/image/upload/v1770231383/skillbridgelogo_ojce3c.png",
            link: "https://skillbridge-livid.vercel.app/",
            github: "https://github.com/ashiphali/skillbridge",
            featured: true
        },
        {
            id: 3,
            title: "StyleHub",
            category: "E-commerce Website",
            description: "E-commerce website with admin panel using the MERN stack. Implemented product management, cart, checkout with GST & shipping, and secure authentication for users, while enabling admins to manage inventory, users, orders, and analytics. Integrated Cloudinary for image storage, and deployed the app on Render ensuring scalability, security, and smooth user experience.",
            longDescription: "Built a full-stack e-commerce application with an admin panel using the MERN stack. Implemented product management, cart, checkout with GST & shipping, and secure authentication for users, while enabling admins to manage inventory, users, orders, and analytics. Integrated Cloudinary for image storage, and deployed the app on Render ensuring scalability, security, and smooth user experience.",
            tech: ["React.js", "CSS3", "JavaScript", "Netlify"],
            image: "https://res.cloudinary.com/dzagepohk/image/upload/v1770230990/stylehub_weyzbq.jpg",
            link: "https://stylehub-frontend-8len.onrender.com/",
            github: "https://github.com/ashiphali/stylehub",
            featured: true
        }
    ],

    social: {
        github: "https://github.com/MAlik-0786/",
        linkedin: "https://www.linkedin.com/in/ashiph-ali-2a444b233/",
        twitter: "https://x.com/ashiph_ali",

    },

    stats: {
        projectsCompleted: "10+",
        yearsExperience: "3+",
        happyClients: "5+",
        technologies: "15+"
    }
};

export default portfolioData;
