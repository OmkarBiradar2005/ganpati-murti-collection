const jwt = require("jsonwebtoken");

const DEMO_ADMIN_EMAIL = "biradaromkar2005@gmail.com";

const getJwtSecret = () =>
  process.env.JWT_SECRET || "demo-jwt-secret";

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Not authorized, token missing" });
    }

    const decoded = jwt.verify(token, getJwtSecret());

    // Accept the token without looking up MongoDB
    req.admin = {
      email:
        decoded.email ||
        process.env.ADMIN_EMAIL ||
        DEMO_ADMIN_EMAIL,
      role: decoded.role || "admin",
    };

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Not authorized, token invalid" });
  }
};

module.exports = { protect };