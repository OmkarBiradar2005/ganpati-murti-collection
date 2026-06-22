const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const dbEnabled = () => Boolean(process.env.MONGODB_URI);
const DEMO_ADMIN_EMAIL = 'biradaromkar2005@gmail.com';
const DEMO_ADMIN_PASSWORD = 'Omkar@2005';
const getJwtSecret = () => process.env.JWT_SECRET || 'demo-jwt-secret';

const seedAdminIfNeeded = async () => {
  if (!dbEnabled()) {
    return null;
  }

  const email = process.env.ADMIN_EMAIL;
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!email || !passwordHash) {
    return null;
  }

  const existing = await Admin.findOne({ email: email.toLowerCase() });
  if (existing) {
    return existing;
  }

  return Admin.create({ email: email.toLowerCase(), passwordHash });
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  if (!dbEnabled()) {
    const fallbackEmail = process.env.ADMIN_EMAIL || DEMO_ADMIN_EMAIL;
    const fallbackHash = process.env.ADMIN_PASSWORD_HASH || (await bcrypt.hash(DEMO_ADMIN_PASSWORD, 10));

    if (email.toLowerCase() !== fallbackEmail.toLowerCase()) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, fallbackHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email: fallbackEmail, role: 'admin', mode: 'fallback' }, getJwtSecret(), {
      expiresIn: '7d',
    });

    return res.json({
      token,
      admin: { id: fallbackEmail, email: fallbackEmail, role: 'admin' },
    });
  }

  await seedAdminIfNeeded();

  const admin = await Admin.findOne({ email: email.toLowerCase() });
  if (!admin) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, admin.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: admin._id, role: admin.role }, getJwtSecret(), { expiresIn: '7d' });

  res.json({
    token,
    admin: { id: admin._id, email: admin.email, role: admin.role },
  });
};

const me = async (req, res) => {
  if (!dbEnabled()) {
    return res.json({
      admin: {
        id: process.env.ADMIN_EMAIL || DEMO_ADMIN_EMAIL,
        email: process.env.ADMIN_EMAIL || DEMO_ADMIN_EMAIL,
        role: 'admin',
      },
    });
  }

  res.json({ admin: req.admin });
};

module.exports = { loginAdmin, me };
