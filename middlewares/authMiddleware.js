import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const verifyToken = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export const checkUserRole = (...roles) => {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, no user info',
      });
    }

    const user = await User.findById(req.user.userId);

    if (!roles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role ${user.role} is not authorized to access this route`,
      });
    }
    next();
  };
};