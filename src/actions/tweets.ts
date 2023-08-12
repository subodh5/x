"use server";
import connectMongoDB from "@/database/mongoDB";
import Tweet from "@/models/tweet";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import { userType } from "@/types/globalTypes";

interface userTypeExtended extends userType{
  _id:string,
  username:string,
  name:string,
  profile_picture:string,
  followers:string[],
  following:string[]
}

const cloudinaryConfig = cloudinary.config({
  cloud_name: "daujtgzbp",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

export async function getSignature() {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: "next" },
    cloudinaryConfig.api_secret!
  );

  return { timestamp, signature };
}

export async function getAllTweet(){
    try{
        await connectMongoDB();
        const allTweets = await Tweet.find({}).sort({_id:-1}) 
        // const allTweets = await Tweet.find({ replyTweetIds: { $exists: false} }).sort({_id:-1}) ;

        return allTweets
    }
    catch(error){
        throw new Error("Connection Problem")
    }
}

export async function getAllFollowingTweet(user:userTypeExtended){
    try{
        await connectMongoDB();
        const allTweets = await Tweet.find({ _id: { $in: user.following} }).sort({_id:-1}) 
        return allTweets
    }
    catch(error){
        throw new Error("Connection Problem")
    }
}

export async function getUserTweet(username:string){
  try {
      await connectMongoDB()
      const tweets = await Tweet.find({ "author.username": username }).sort({ createdAt: -1 });
      revalidatePath(`/home/profile/${username}`)
      return tweets
  } catch (error) {
    throw new Error("Can't find posts")
  }
}

export async function findTweetsLikedByUser(userId:string) {
  try {
    const tweets = await Tweet.find({ likes: userId }).sort({ createdAt: -1 });
    return tweets;
  } catch (error) {
    throw new Error("Can't find posts");
  }
}

export async function getTweetById(id:string){
    try {
        await connectMongoDB();
        const tweet = await Tweet.findById({_id:id})
        return tweet
    } catch (error) {
        throw new Error("Connection Problem")

    }
}

export async function getReplies(postId:string){
  try {
    await connectMongoDB()
    const tweet = await Tweet.findById(postId);
    const replyTweets = await Tweet.find({
      _id: { $in: tweet.replyTweetIds }
    }).sort({_id:-1}) ;
    return replyTweets;
  } catch (error) {
    throw new Error("Failed to fetch")
  }
}

export async function postTweet({
  public_id,
  tweet,
  user,
}: {
  public_id: string;
  tweet: string;
  user: userType | null;
}) {
  try {
    await connectMongoDB();
    const newTweet = new Tweet({
      content: tweet,
      photoURL: public_id ? `https://res.cloudinary.com/daujtgzbp/image/upload/${public_id}.png`:"",
      likes: [],
      replyTweetIds:[],
      author: {
        name: user?.name,
        username: user?.username,
        profileURL: user?.profile_picture,
      },
    });
    await newTweet.save();
    revalidatePath("/home");
  } catch (error) {
    
    throw new Error("Failed to post");
  }
}

export async function postReplyTweet(reply:string,user:userType,tweetId:string){
  try {
    await connectMongoDB()
    const originalTweet = await Tweet.findById(tweetId);
    const newReplyTweet = new Tweet({
      content:reply,
      likes:[],
      replyTweetIds:[],
      author:{
        name:user.name,
        username:user.username,
        profileURL:user.profile_picture
      }
    })
    await newReplyTweet.save();
    await originalTweet.replyTweetIds.push(newReplyTweet._id);
    await originalTweet.save()
    revalidatePath(`/home/post/${tweetId}`)

  } catch (error) {
    throw new Error("Failed to post")
  }
}

export async function likeTweet(postId:string, userId:string){
  try {
    await connectMongoDB()
    await Tweet.findOneAndUpdate(
      { _id: postId },
      { $addToSet: { "likes": userId } },
    );
    revalidatePath("/home")

  } catch (error) {
      throw new Error("Failed to like")
  }
}

export async function unLikeTweet(postId:string, userId:string) {
  try {
    await connectMongoDB(); 
    await Tweet.findOneAndUpdate(
      { _id: postId },
      { $pull: { "likes": userId } }, 
      { new: true }
    );
    revalidatePath("/home")

  } catch (error) {
    throw new Error("Failed to unlike");
  }
}
