// models/project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    images: [{ url: String, description: String, audio: String }],
    videoUrl: String,
    audioFile: String,
    intro: String,
    credits: String,
    url: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
