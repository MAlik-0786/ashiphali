# 🚀 Quick Start Guide

## Prerequisites
- Node.js installed (v16+)
- MongoDB installed locally OR MongoDB Atlas account
- Git installed

## Step 1: Start MongoDB (if using local)
```bash
# Windows (if MongoDB is installed as a service)
net start MongoDB

# Or start manually
mongod
```

## Step 2: Start Backend Server
```bash
# Navigate to backend folder
cd backend

# The dependencies are already installed
# Start the development server
npm run dev
```

You should see:
```
🚀 Server running on port 5000
✅ MongoDB Connected Successfully
📡 Environment: development
```

## Step 3: Start Frontend (in a new terminal)
```bash
# Navigate to frontend folder
cd frontend

# The dependencies are already installed
# Start the development server
npm run dev
```

You should see:
```
  VITE v5.0.8  ready in XXX ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

## Step 4: Open the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Admin Dashboard**: http://localhost:3000/admin

## 🎯 Testing the Application

### Test Contact Form
1. Go to http://localhost:3000
2. Fill out the contact form
3. Submit and check for success message

### Test Admin Dashboard
1. Go to http://localhost:3000/admin
2. View submitted contacts
3. Click on a contact to see details
4. Update status or delete contacts

## 📝 MongoDB Connection

### Option 1: Local MongoDB
The `.env` file is already configured for local MongoDB:
```env
MONGODB_URI=mongodb://localhost:27017/portfolio-contacts
```

### Option 2: MongoDB Atlas (Cloud)
1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Get your connection string
4. Update `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio-contacts
```

## 🔧 Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Check if port 5000 is available
- Verify `.env` file exists in backend folder

### Frontend won't start
- Check if port 3000 is available
- Run `npm install` again if needed
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Can't connect to MongoDB
- Verify MongoDB is running: `mongosh` or `mongo`
- Check connection string in `.env`
- For Atlas: Check IP whitelist settings

### API calls failing
- Verify backend is running on port 5000
- Check browser console for errors
- Verify proxy settings in `vite.config.js`

## 📦 Build for Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## 🎨 Customization

### Change Colors
Edit `frontend/src/index.css` and modify CSS variables:
```css
:root {
  --accent-primary: #00ff88;  /* Change this */
  --accent-secondary: #00cc6f; /* And this */
}
```

### Change Port
Backend: Edit `backend/.env`
```env
PORT=5000  # Change to your preferred port
```

Frontend: Edit `frontend/vite.config.js`
```js
server: {
  port: 3000  // Change to your preferred port
}
```

## 📚 Next Steps

1. ✅ Test all features
2. ✅ Customize colors and branding
3. ✅ Add authentication for admin panel
4. ✅ Deploy to production
5. ✅ Set up email notifications

## 🆘 Need Help?

- Check the main README.md for detailed documentation
- Review the code comments
- Check MongoDB connection
- Verify all environment variables

---

**Happy Coding! 🚀**
