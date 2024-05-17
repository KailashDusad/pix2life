const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = 'cPvi36r8Bh1ESisaanRT8x1SZTlj5m5l';

module.exports = {
    protect: async (req, res, next) => {
        let token;

        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = await User.findById(decoded.id);
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized' });
        }
    }
};
