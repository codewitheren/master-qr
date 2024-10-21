import express from 'express';
import * as userController from '../controllers/userController.js';
import { verifyToken, checkUserRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, checkUserRole('admin'), userController.getUsers);
router.get(
  '/:id',
  verifyToken,
  checkUserRole('admin'),
  userController.getUserById
);
router.put(
  '/:id',
  verifyToken,
  checkUserRole('admin'),
  userController.updateUser
);
router.delete(
  '/:id',
  verifyToken,
  checkUserRole('admin'),
  userController.deleteUser
);
router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);

export default router;
