// routes/index.js
const express = require('express');
const router = express.Router();
const Project = require('../models/project');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/create', (req, res) => {
    res.render('project');
});

router.post('/create', async (req, res) => {
    const { name, type, videoUrl, audioFile, intro, credits } = req.body;
    const url = generateUrl(); // Implement URL generation logic
    const project = new Project({ name, type, videoUrl, audioFile, intro, credits, url });

    await project.save();
    res.redirect('/');
});

router.get('/manage', async (req, res) => {
    const projects = await Project.find();
    res.render('manage', { projects });
});

module.exports = router;

function generateUrl() {
    return 'https://yourdomain.com/project/' + Math.random().toString(36).substr(2, 9);
}
