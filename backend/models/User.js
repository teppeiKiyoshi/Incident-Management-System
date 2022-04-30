import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  lastName: {
    type: String,
    required: [true, "Please provide last name"],
    maxlength: 50,
    trim: true,
  },
  firstName: {
    type: String,
    required: [true, "Please provide first name"],
    maxlength: 50,
    trim: true,
  },
  middleInitial: {
    type: String,
    required: [true, "Please provide middle initial"],
    maxlength: 50,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
  },
  studNum: {
    type: String,
    required: [true, "Please provide student number"],
    unique: true,
  },
  yearLevel: {
    type: Number,
  },
  section: {
    type: String,
    required: [true, "Please provide section"],
    trim: true,
  },
  phoneNum: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 8,
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

export default mongoose.model("User", UserSchema);
