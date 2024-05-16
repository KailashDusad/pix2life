const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();

mongoose.connect('mongodb://localhost/pix2life', { useNewUrlParser: true, useUnifiedTopology: true });

const projectSchema = new mongoose.Schema({
    name: String,
    scanImage: String,
    contentType: String,
    images: [{ url: String, description: String }],
    video: String,
    audio: String,
    intro: String,
    closing: String,
    url: String
});

const Project = mongoose.model('Project', projectSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
const upload = multer({ storage: storage });

app.post('/api/register', (req, res) => {
    // Registration logic
});

app.post('/api/project', upload.single('scanImage'), (req, res) => {
    const project = new Project({
        name: req.body.name,
        scanImage: req.file.path,
        contentType: req.body.contentType,
        images: req.body.images,
        video: req.body.video,
        audio: req.body.audio,
        intro: req.body.intro,
        closing: req.body.closing,
        url: `http://pix2life.com/${req.body.name}`
    });

    project.save()
        .then(() => res.status(201).send('Project created successfully'))
        .catch(err => res.status(500).send(err.message));
});

app.get('/api/projects', (req, res) => {
    Project.find()
        .then(projects => res.json(projects))
        .catch(err => res.status(500).send(err.message));
});

app.listen(3000, () => console.log('Server started on port 3000'));
