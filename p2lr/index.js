const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

mongoose.connect('mongodb://localhost:27017/pix2life', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
});

const ProjectSchema = new mongoose.Schema({
    projectName: String,
    scanImage: String,
    mediaType: String,
    mediaFiles: [String],
    intro: String,
    closing: String,
    projectUrl: String,
});

const User = mongoose.model('User', UserSchema);
const Project = mongoose.model('Project', ProjectSchema);


app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(cors());
app.use(express.json());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'static/pug'));


app.get('/', (req, res) => {
    res.status(200).render('menu.pug');
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
