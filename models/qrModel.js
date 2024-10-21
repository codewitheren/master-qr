import mongoose from 'mongoose';

const qrSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    statistics: {
      scans: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const QR = mongoose.model('QR', qrSchema);

export default QR;
