import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const StaffSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  middleInitial: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  contact: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  position: {
    type: String,
  },
});

StaffSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

StaffSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

export default mongoose.model("Staff", StaffSchema);
