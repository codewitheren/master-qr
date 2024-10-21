import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import QR from '../models/qrModel.js';

export const verifyToken = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
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
    try {
      if (!req.user.userId) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized, no user info',
        });
      }

      const user = await User.findById(req.user.userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: `User role ${user.role} is not authorized to access this route`,
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while checking user role',
        error: error.message,
      });
    }
  };
};

export const checkQROwner = async (req, res, next) => {
  try {
    const [qr, user] = await Promise.all([
      QR.findById(req.params.id),
      User.findById(req.user.userId).select('role'),
    ]);

    if (!qr || !user) {
      return res.status(404).json({
        success: false,
        message: 'QR or user not found',
      });
    }

    const isOwner = qr.userId.toString() === req.user.userId;
    const isAdmin = user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this QR',
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};
