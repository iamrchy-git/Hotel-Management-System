import jwt from 'jsonwebtoken';
import User from '../features/users/user.model.js';

// Verify JWT token
export const authenticate = async (req, res, next) => {
    try {
        //check authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Access token is missing or invalid',
            });
        }

        //extract token
        const token = authHeader.split(' ')[1];

        // 3. Validate JWT secret exists (ADDED)
        const secret = process.env.JWT_ACCESS_SECRET;
        if (!secret) {
            console.error('❌ JWT_ACCESS_SECRET not defined in .env');
            return res.status(500).json({
                success: false,
                message: 'Server configuration error',
            });
        }


        //Verify token
        const decoded = jwt.verify(token,secret);

        //Check if user still exists
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'The user belonging to this token no longer exists',
            });
        }

        //Attach user to request object
        req.user = user;
        next();
    } catch (error) {
        console.error('Auth Middleware Error:', error);

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: error.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token',
            });
        }

    }
};

// Role-based access control
export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.roles)) {
            return res.status(403).json({
                success: false,
                message: 'You do not have permission to perform this action',
            });
        }
        next();
    };
};