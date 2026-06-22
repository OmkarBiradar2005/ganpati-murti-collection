const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const dbEnabled = () => Boolean(process.env.MONGODB_URI);
const DEMO_ADMIN_EMAIL = 'biradaromkar2005@gmail.com';
const getJwtSecret = () => process.env.JWT_SECRET || 'demo-jwt-secret';

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, token missing' });
    }

    const decoded = jwt.verify(token, getJwtSecret());

    if (!dbEnabled()) {
      req.admin = {
        id: decoded.id || process.env.ADMIN_EMAIL || DEMO_ADMIN_EMAIL,
        email: decoded.email || process.env.ADMIN_EMAIL || DEMO_ADMIN_EMAIL,
        role: decoded.role || 'admin',
      };
      return next();
    }

    const admin = await Admin.findById(decoded.id).select('-passwordHash');

    if (!admin) {
      return res.status(401).json({ message: 'Not authorized, admin not found' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token invalid' });
  }
};

module.exports = { protect };
