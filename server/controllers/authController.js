const jwt = require('jsonwebtoken');

const DEMO_ADMIN_EMAIL = 'biradaromkar2005@gmail.com';
const DEMO_ADMIN_PASSWORD = 'Omkar@2005';

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const adminEmail = process.env.ADMIN_EMAIL || DEMO_ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD || DEMO_ADMIN_PASSWORD;

    if (
      email.toLowerCase() !== adminEmail.toLowerCase() ||
      password !== adminPassword
    ) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    const token = jwt.sign(
      {
        email: adminEmail,
        role: 'admin',
      },
      process.env.JWT_SECRET || 'demo-jwt-secret',
      {
        expiresIn: '7d',
      }
    );

    res.json({
      token,
      admin: {
        email: adminEmail,
        role: 'admin',
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const me = async (req, res) => {
  res.json({
    admin: {
      email:
        process.env.ADMIN_EMAIL || DEMO_ADMIN_EMAIL,
      role: 'admin',
    },
  });
};

module.exports = {
  loginAdmin,
  me,
};