import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 280
  },
  photoURL: {
    type: String,
    trim: true,
  },
  likes:[{
    type:String
  }],
  author: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    username: {
      type: String,
      required: true,
      trim: true
    },
    profileURL: {
      type: String,
      default:"https://res.cloudinary.com/daujtgzbp/image/upload/default-profile_ypunu8.jpg",
      trim: true
    }
  },
  replyTweetIds:[{
    type:String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Tweet model
const Tweet = mongoose.models?.tweet || mongoose.model("tweet", tweetSchema);

export default Tweet
