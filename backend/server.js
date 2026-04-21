const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cron = require('node-cron');

// 1. Models
const Job = require('./models/Job');
const User = require('./models/User');
const Contact = require('./models/Contact'); // Ensure this file exists in /models
const runScraper = require('./scrapers/jobScraper');

const app = express();

// 2. Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// 3. Auth Middleware
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send("Access Denied");
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

// 4. --- AUTH ROUTES ---
app.post('/api/auth/signup', async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, user: { email: user.email } });
  } catch (e) { res.status(400).send("User already exists"); }
});

app.post('/api/auth/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, user: { email: user.email } });
  } else { res.status(401).send("Invalid credentials"); }
});

// 5. --- JOB ROUTES ---
app.get('/api/jobs', async (req, res) => {
  try {
    const { q, page = 1 } = req.query;
    const limit = 10;
    const filter = q ? { $text: { $search: q } } : {};
    const totalJobs = await Job.countDocuments(filter);
    const jobs = await Job.find(filter)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ postedAt: -1 });
    res.json({ jobs, totalPages: Math.ceil(totalJobs / limit), currentPage: Number(page) });
  } catch (error) { res.status(500).json({ message: "Server Error" }); }
});

app.post('/api/jobs/save', authMiddleware, async (req, res) => {
    const user = await User.findById(req.user.id);
    user.savedJobs.push(req.body.jobId);
    await user.save();
    res.send("Job Saved");
});

// 6. --- CONTACT ROUTE ---
app.post('/api/contact', async (req, res) => {
  try {
    console.log("Contact Request Received:", req.body);
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ message: "Request saved successfully!" });
  } catch (error) {
    console.error("DB Save Error:", error);
    res.status(500).send("Error saving contact request");
  }
});

// 7. --- AUTOMATION & DATABASE ---
cron.schedule('0 0 * * *', () => {
  console.log("Starting daily scrape...");
  runScraper();
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.log("Database Connection Error:", err));