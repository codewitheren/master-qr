import express from 'express';
import * as qrController from '../controllers/qrController.js';
import {
  verifyToken,
  checkUserRole,
  checkQROwner,
} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, checkUserRole('admin'), qrController.getQRs);
router.get('/my-qrs', verifyToken, qrController.getMyQRs);
router.get('/:id', verifyToken, checkQROwner, qrController.getQRById);
router.get('/scan/:id', qrController.scanQR);
router.post('/', verifyToken, qrController.createQR);
router.put('/:id', verifyToken, checkQROwner, qrController.updateQR);
router.delete('/:id', verifyToken, checkQROwner, qrController.deleteQR);

export default router;
