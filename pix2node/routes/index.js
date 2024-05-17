const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const { protect } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/create', protect, (req, res) => {
    res.render('project');
});

router.post('/create', protect, upload.single('scannableImage'), async (req, res) => {
    const { name, type, videoUrl, audioFile, intro, credits } = req.body;
    const scannableImage = req.file ? req.file.path : '';
    const url = `http://pix2life.com/project/${name.toLowerCase().replace(/\s+/g, '-')}`;

    const project = new Project({ 
        name, 
        type, 
        videoUrl, 
        audioFile, 
        intro, 
        credits, 
        url, 
        user: req.user._id,
        images: type === 'Image Gallery' ? req.body.images.map(img => ({ url: img.url, description: img.description, audio: img.audio })) : [],
        scannableImage 
    });

    await project.save();
    res.redirect('/manage');
});

router.get('/manage', protect, async (req, res) => {
    const projects = await Project.find({ user: req.user._id });
    res.render('manage', { projects });
});

module.exports = router;
