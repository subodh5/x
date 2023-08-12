"use server";
import connectMongoDB from "@/database/mongoDB";
import User from "@/models/user";
import bcryptjs from "bcryptjs";
import { cookies } from "next/headers";
import * as jose from 'jose'

export default async function submitSignup(userData: FormData) {
  const {
    name,
    username,
    email,
    password,
    confirmPassword,
  }: {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  } = Object.fromEntries(userData);
  
  
  try {
    await connectMongoDB();
    if (password !== confirmPassword) {
      throw Error("Password doesn't match")
    }
    const user = await User.findOne({ email });
    if (user) {
      throw Error("User already exists")
    }

    const usernameExist = await User.findOne({username})
    if(usernameExist){
      throw new Error("Username already taken")
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password!, salt);

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET_TOKEN!
    )
    
    const alg = 'HS256'
    
    const token = await new jose.SignJWT({ id:savedUser._id, isVerified:savedUser.isVerified})
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setIssuer('XHost')
      .setAudience('urn:example:audience')
      .setExpirationTime('6h')
      .sign(secret)
          
    
    cookies().set("token", token, {
      httpOnly: true,
    });

    cookies().set("token", token, {
      httpOnly: true,
    });

    return {
      message: "User created successfully",
    };

  } catch (err:any) {
    throw Error(err.message)
  }
}
