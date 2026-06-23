const jwt = require('jsonwebtoken');
const { getModels } = require('../services/dbHelper');

const authenticateUser = async (req, res, next) => {
  try {
    let token;
    
    // Check for token in Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user and attach to request dynamically
    const { User } = getModels();
    let user;
    
    const userQuery = User.findById(decoded.id);
    if (userQuery && typeof userQuery.select === 'function') {
      user = await userQuery.select('-password');
    } else {
      user = await userQuery;
    }
    
    if (!user) {
      return res.status(401).json({ error: 'User no longer exists.' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

module.exports = authenticateUser;
