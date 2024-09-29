import mongoose from "mongoose";

const qrSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  type: {
    type: String,
    required: true
  },
  data: {
    type: String,
    required: true
  },
  statistics: {
    type: Object,
    default: {
      totalScans: 0,
      uniqueScans: 0,
    }
  }
});

const QR = mongoose.model("QR", qrSchema);
