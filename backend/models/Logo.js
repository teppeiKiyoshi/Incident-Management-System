import mongoose from "mongoose";

const LogoSchema = new mongoose.Schema({
  base64: {
    type: String,
  },
});

export default mongoose.model("Logo", LogoSchema);
