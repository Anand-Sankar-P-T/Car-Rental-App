const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authDealer = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: 'Not authorized, no token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (user && user.role === 'dealer') {
      req.user = user;
      next();
    } else {
      return res.status(403).json({ message: 'Access denied: Dealers only' });
    }
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = authDealer;
