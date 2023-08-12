"use server";
import connectMongoDB from "@/database/mongoDB";
import User from "@/models/user";
import * as jose from "jose";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getCurrentUser() {
  try {
    await connectMongoDB();
    const token = cookies().get("token")?.value || "";

    const secret = new TextEncoder().encode(process.env.JWT_SECRET_TOKEN!);
    let decodedToken;
    if (token) {
      const { payload } = await jose.jwtVerify(token, secret, {
        issuer: "XHost",
        audience: "urn:example:audience",
      });
      decodedToken = payload;
    }
    const userId = decodedToken?.id;
    const currentUser = await User.findById(userId);
    currentUser.password = null;
    return currentUser;
  } catch (error) {
    throw new Error("User not found");
  }
}

export async function getUserById(id: string) {
  try {
    await connectMongoDB();
    const user = await User.findById({ _id: id });
    return user;
  } catch (error) {
    throw new Error("User not found");
  }
}
export async function getUserByUsername(username:string){
  try{
    await connectMongoDB();
    const user = await User.findOne({username:username});
    user.password= null;
    revalidatePath(`/home/profile/${username}`)
    return user;
  }
  catch(error){
    throw new Error ("User not found");
  }
}

export async function getFollowingUsers(id: string) {
  try {
    await connectMongoDB();
    const user = await User.findById({ _id: id });
    const followingUsers = await User.find({ _id: { $in: user.following } });
    return followingUsers;
  } catch (error) {
    throw new Error("User not found");
  }
}

export async function getFollowersUsers(id: string) {
  try {
    await connectMongoDB();
    const user = await User.findById({ _id: id });
    const followersUsers = await User.find({ _id: { $in: user.followers } });
    return followersUsers;
  } catch (error) {
    throw new Error("User not found");
  }
}

export async function follow({
  userId,
  followUserId,
}: {
  userId: string;
  followUserId: string;
}) {
  try {
    await User.findByIdAndUpdate(followUserId, {
      $addToSet: { followers: userId },
    });

    await User.findByIdAndUpdate(userId, {
      $addToSet: { following: followUserId },
    });

    revalidatePath(`/home/profile/${userId}`);
  } catch (error) {
    throw new Error("Task Failed");
  }
}

export async function unfollowUser({
  userId,
  unfollowUserId,
}: {
  userId: string;
  unfollowUserId: string;
}) {
  try {
    await User.findByIdAndUpdate(unfollowUserId, {
      $pull: { followers: userId },
    });

    await User.findByIdAndUpdate(userId, {
      $pull: { following: unfollowUserId },
    });

    revalidatePath(`/home/profile/${userId}`);
  } catch (error) {
    throw new Error("Task Failed");
  }
}
