const jwt = require('jsonwebtoken');
    const UserModel = require('../models/user'); // Ensure correct path to User model

    const protect = async (req, res, next) => {
        let token;

        // Check if token exists in cookies
        if (req.cookies.token) {
            try {
                // Get token from cookie
                token = req.cookies.token;

                // Verify token
                const decoded = jwt.verify(token, process.env.JWT_SECRET);

                // Attach user to the request (excluding password)
                req.user = await UserModel.findById(decoded.id).select('-password');

                next(); // Proceed to the next middleware or route handler
            } catch (error) {
                console.error('JWT verification failed:', error);
                return res.status(401).json({ error: 'Not authorized, token failed' });
            }
        }

        if (!token) {
            return res.status(401).json({ error: 'Not authorized, no token' });
        }
    };

    module.exports = { protect };