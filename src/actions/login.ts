"use server";
import connectMongoDB from "@/database/mongoDB";
import { cookies } from "next/headers";
import User from "@/models/user";
import bcryptjs from "bcryptjs";
import * as jose from 'jose'

export default async function submitLogin(userData: FormData) {
  try {
    await connectMongoDB();
    const { username, password }: { username?: string; password?: string } =
      Object.fromEntries(userData);

    const user = await User.findOne({$or:[{username:username},{email:username}] });
    if (!user) {
      throw new Error("Invalid user credentials");
    }

    const validPassword = await bcryptjs.compare(password!, user.password);
    if (!validPassword) {
      throw new Error("Invalid user credentials");

    }

    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET_TOKEN!
    )
    
    const alg = 'HS256'
    
    const token = await new jose.SignJWT({ id:user._id, isVerified:user.isVerified})
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setIssuer('XHost')
      .setAudience('urn:example:audience')
      .setExpirationTime('6h')
      .sign(secret)
          
    
    cookies().set("token", token, {
      httpOnly: true,
    });


    return { message: "success" };
  } catch (error: any) {
    console.log(error);
    
    if (error.message === "Invalid user credentials") {
      throw error;
    } else {
      throw new Error("Internal server error");
    }
  }
}
