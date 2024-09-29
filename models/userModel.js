import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"]
  },
  qr: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'QR'
    }
  ]
});

const User = mongoose.model("User", userSchema);

export default User;
