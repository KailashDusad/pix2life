// routes/index.js
const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// JWT secret key
const JWT_SECRET = 'your_jwt_secret';

// Helper function to generate JWT token
const generateToken = (user) => {
    return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
};

// Middleware for protecting routes
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return res.status(401).send('Not authorized');
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (err) {
        return res.status(401).send('Not authorized');
    }
};

// Registration route
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();

    // Send confirmation email with app store link (placeholder)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: user.email,
        subject: 'PIX2LIFE Registration Confirmation',
        text: 'Thank you for registering! Please download our app from the appropriate store: [App Store Link]'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.redirect('/login');
});

// Login route
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        const token = generateToken(user);
        res.json({ token });
    } else {
        res.status(401).send('Invalid email or password');
    }
});

// Create project route
router.get('/create', protect, (req, res) => {
    res.render('project');
});

router.post('/create', protect, upload.single('scanImage'), async (req, res) => {
    const { name, type, videoUrl, audioFile, intro, credits } = req.body;
    const scanImage = req.file.path; // Path to uploaded scan image
    const url = generateUrl(); // Implement URL generation logic
    const project = new Project({
        name,
        type,
        scanImage,
        videoUrl,
        audioFile,
        intro,
        credits,
        url,
        user: req.user._id
    });

    await project.save();
    res.redirect('/');
});

// Manage projects route
router.get('/manage', protect, async (req, res) => {
    const projects = await Project.find({ user: req.user._id });
    res.render('manage', { projects });
});

// Scan route
router.get('/scan', protect, (req, res) => {
    res.render('scan');
});

router.post('/scan', protect, async (req, res) => {
    // Implement scan logic to find matching project
    // For example, based on an uploaded scan image
    const scannedImage = req.file.path;
    const project = await Project.findOne({ scanImage: scannedImage });
    if (project) {
        res.redirect(project.url);
    } else {
        res.status(404).send('No matching project found');
    }
});

module.exports = router;

function generateUrl() {
    return 'https://yourdomain.com/project/' + Math.random().toString(36).substr(2, 9);
}
