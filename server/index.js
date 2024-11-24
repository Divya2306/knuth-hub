const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const userRoutes = require('./routes/users');
const websiteRoutes = require('./routes/websites');
const toolRoutes = require('./routes/tools');
const eventRoutes = require('./routes/events');
const coordinatorRoutes = require('./routes/coordinators');
const announcementRoutes = require('./routes/announcements');
const feedbackRoutes = require('./routes/feedbacks');
const podRoutes = require('./routes/pods');
const app = express();
const path = require('path');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();


// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/users', userRoutes);
app.use('/api/websites', websiteRoutes);
app.use('/api/tools', toolRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/coordinators', coordinatorRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/pod', podRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
