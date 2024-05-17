const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/pix2life', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use('/', indexRouter);
app.use('/', authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
