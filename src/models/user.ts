import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  profile_picture: {
    type: String,
    default: 'https://res.cloudinary.com/daujtgzbp/image/upload/default-profile_ypunu8.jpg', // You can set a default profile picture URL
  },
  bio: {
    type: String,
    default: '',
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  isVerified:{
    type:Boolean,
    default:false
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  verifyToken:String,
  verifyTokenExpiry:Date,
  passwordResetToken:String,
  passwordResetExpiry:Date

});

// Create the User model using the schema
const User = mongoose.models?.users || mongoose.model("users", userSchema);

export default User