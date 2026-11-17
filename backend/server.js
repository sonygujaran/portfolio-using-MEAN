import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import projects from './routes/project.js';
import skills from './routes/skills.js';
import experience from './routes/experience.js';
import education from './routes/education.js';
import internship from './routes/internship.js';
import certifications from './routes/certification.js';
import dotenv from 'dotenv';
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/projects', projects);
app.use('/api/skills', skills);
app.use('/api/experience', experience);
app.use('/api/education', education);
app.use('/api/internships', internship);
app.use('/api/certifications', certifications);





// MongoDB Connection & Server Startup
const mongoURI =dotenv.config().parsed.MONGODB_URI;
const PORT = 3000;

const startServer = async () => {
  try {
    if (!mongoURI) throw new Error('MONGODB_URI environment variable is required');
    await mongoose.connect(mongoURI, {
      tls: true,
      tlsAllowInvalidCertificates: true,
    });
    console.log('MongoDB connected');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

startServer();
