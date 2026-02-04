# 📬 Contact Portfolio App

A modern, full-stack contact management system built with the MERN stack, featuring a dark, premium UI design inspired by modern portfolio websites.

![MERN Stack](https://img.shields.io/badge/MERN-Stack-green)
![React](https://img.shields.io/badge/React-18.2-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-brightgreen)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)

## ✨ Features

### Frontend
- 🎨 **Modern Dark Theme UI** - Sleek, professional design with glassmorphism effects
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- ⚡ **Fast & Smooth** - Optimized performance with smooth animations
- 🎯 **Form Validation** - Real-time client-side validation with helpful error messages
- 🔔 **Toast Notifications** - User-friendly feedback for all actions
- 🎭 **Beautiful Animations** - Fade-in, slide-in, and hover effects

### Backend
- 🔒 **Secure API** - RESTful API with proper error handling
- 📊 **MongoDB Integration** - Efficient data storage and retrieval
- ✅ **Data Validation** - Server-side validation with Mongoose schemas
- 📈 **Statistics Dashboard** - Real-time contact statistics
- 🏷️ **Status Management** - Track contact status (new, read, replied, archived)
- 🔍 **Filtering & Search** - Filter contacts by status

### Admin Dashboard
- 📊 **Statistics Overview** - Visual stats for all contacts
- 📋 **Contact List** - View all submissions with filtering
- 👁️ **Detailed View** - See full contact information
- 🏷️ **Status Updates** - Change contact status easily
- 🗑️ **Delete Contacts** - Remove unwanted submissions
- 🔄 **Real-time Updates** - Instant refresh functionality

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Icons** - Beautiful icon library
- **React Toastify** - Toast notifications
- **Vite** - Fast build tool

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Clone the Repository
```bash
git clone <your-repo-url>
cd contact-portfolio-app
```

### Backend Setup
```bash
cd backend
npm install

# Create .env file
# Add the following:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio-contacts
NODE_ENV=development

# Start the server
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install

# Create .env file (if needed)
# Add the following:
VITE_API_URL=http://localhost:5000

# Start the development server
npm run dev
```

## 🎯 Usage

### For Users
1. Navigate to the home page
2. Fill out the contact form with your details
3. Submit the form
4. Receive a confirmation message

### For Admins
1. Navigate to `/admin`
2. View all contact submissions
3. Filter by status (new, read, replied, archived)
4. Click on a contact to view details
5. Update status or delete contacts

## 📁 Project Structure

```
contact-portfolio-app/
├── backend/
│   ├── models/
│   │   └── Contact.js          # MongoDB schema
│   ├── routes/
│   │   └── contactRoutes.js    # API routes
│   ├── .env                    # Environment variables
│   ├── server.js               # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ContactForm.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── Admin.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css           # Global styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## 🎨 Design Features

- **Color Scheme**: Dark theme with neon green accents (#00ff88)
- **Typography**: Inter & Space Grotesk fonts
- **Animations**: Smooth transitions and hover effects
- **Glassmorphism**: Modern frosted glass effects
- **Responsive Grid**: Adapts to all screen sizes

## 🔧 API Endpoints

### Contacts
- `POST /api/contacts` - Submit a new contact
- `GET /api/contacts` - Get all contacts (with pagination)
- `GET /api/contacts/:id` - Get single contact
- `PATCH /api/contacts/:id/status` - Update contact status
- `DELETE /api/contacts/:id` - Delete a contact
- `GET /api/contacts/stats/summary` - Get statistics

## 🌟 Key Features Explained

### Form Validation
- Client-side validation with real-time feedback
- Server-side validation with Mongoose
- Helpful error messages for users

### Status Management
- **New**: Just submitted
- **Read**: Viewed by admin
- **Replied**: Response sent
- **Archived**: Completed/closed

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly interface

## 🚀 Deployment

### Backend (Render/Heroku)
1. Set environment variables
2. Connect MongoDB Atlas
3. Deploy backend

### Frontend (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=production
```

### Frontend (.env)
```env
VITE_API_URL=your_backend_url
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Ashiph Ali**
- Portfolio: [ashiphali.netlify.app](https://ashiphali.netlify.app/)
- GitHub: [@ashiphali](https://github.com/ashiphali)
- LinkedIn: [Ashiph Ali](https://linkedin.com/in/ashiphali)

## 🙏 Acknowledgments

- Inspired by modern portfolio designs
- Built with love using MERN stack
- Icons from React Icons
- Fonts from Google Fonts

---

**Built with ♥ using MERN Stack**
