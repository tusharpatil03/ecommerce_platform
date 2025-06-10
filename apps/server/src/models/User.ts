import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please enter your Email Id"],
    maxLength: [40, "Email can not exceed 40 charactors"],
    unique: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  salt: {
    type: String,
    required: true,
    select: false,
  },

  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export const User = mongoose.model("User", userSchema);
