const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// MongoDB setup
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

// Routes
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  user.save((err, user) => {
    if (err) return res.status(500).send('Error registering new user');
    res.status(200).send('User registered successfully');
  });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send('Invalid credentials');

  const token = jwt.sign({ id: user._id }, 'secret_key', { expiresIn: '1h' });
  res.status(200).json({ token });
});

// Middleware to check JWT token
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied');

  try {
    const decoded = jwt.verify(token, 'secret_key');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

// Project creation route
app.post('/api/projects', authMiddleware, upload.fields([{ name: 'scanImage' }, { name: 'mediaFiles' }]), (req, res) => {
  const { projectName, mediaType, intro, closing } = req.body;
  const scanImage = req.files['scanImage'][0].filename;
  const mediaFiles = req.files['mediaFiles'] ? req.files['mediaFiles'].map(file => file.filename) : [];

  const project = new Project({
    projectName,
    scanImage,
    mediaType,
    mediaFiles,
    intro,
    closing,
  });

  project.save((err, project) => {
    if (err) return res.status(500).send('Failed to create project');
    res.status(200).send('Project created successfully');
  });
});

// Route to handle image scanning and matching
app.post('/api/scan', authMiddleware, upload.single('image'), (req, res) => {
  // Image recognition logic to match scanned image with database entries
  const image = req.file.filename;
  // Implement image matching algorithm here
  // For simplicity, let's assume we find a match
  Project.findOne({ scanImage: image }, (err, project) => {
    if (err) return res.status(500).send('Failed to scan image');
    if (!project) return res.status(404).send('No match found');
    res.status(200).json({ projectUrl: project.projectUrl });
  });
});

// Static files to serve the frontend
app.use(express.static('public'));

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
