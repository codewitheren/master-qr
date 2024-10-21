import QR from '../models/qrModel.js';
import QRService from '../services/qrService.js';

// @desc    Get all QRs
// @route   GET /api/v1/qrs
// @access  Private/Admin
export const getQRs = async (req, res, next) => {
  try {
    const qrs = await QR.find();
    res.status(200).json({
      success: true,
      data: qrs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single QR
// @route   GET /api/v1/qrs/:id
// @access  Private/Admin
export const getQRById = async (req, res, next) => {
  try {
    const qr = await QR.findById(req.params.id);
    if (!qr) {
      return res.status(404).json({
        success: false,
        message: 'QR not found',
      });
    }
    res.status(200).json({
      success: true,
      data: qr,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all QRs created by the logged in user
// @route   GET /api/v1/qrs/my-qrs
// @access  Private/User/Admin
export const getMyQRs = async (req, res, next) => {
  try {
    const qrs = await QR.find({ userId: req.user.userId });
    res.status(200).json({
      success: true,
      data: qrs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new QR
// @route   POST /api/v1/qrs
// @access  Private/User/Admin
export const createQR = async (req, res, next) => {
  try {
    const qr = await QRService.createQR(
      req.body.type,
      req.body.data,
      req.user.userId
    );

    res.status(201).json({
      success: true,
      data: qr,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update QR
// @route   PUT /api/v1/qrs/:id
// @access  Private/User/Admin
export const updateQR = async (req, res, next) => {
  try {
    const qr = await QR.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: qr,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete QR
// @route   DELETE /api/v1/qrs/:id
// @access  Private/User/Admin
export const deleteQR = async (req, res, next) => {
  try {
    await QR.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'QR deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Scan QR
// @route   GET /api/v1/qrs/scan/:id
// @access  Public
export const scanQR = async (req, res, next) => {
  try {
    const qr = await QR.findById(req.params.id);

    if (!qr) {
      return res.status(404).json({
        success: false,
        message: 'QR not found',
      });
    }

    const result = await QRService.handleQRType(qr.type, qr.data);

    qr.statistics.scans += 1;

    qr.save();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
