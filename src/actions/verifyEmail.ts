"use server"
import User from "@/models/user";
import { sendEmail } from "@/mail/mailer";
import { cookies } from "next/headers";
import * as jose from 'jose'
import connectMongoDB from "@/database/mongoDB";


export async function sendVerificationEmail(userData: FormData) {
  "use server"
  try {
    const userId = userData.get("userId")?.valueOf();
    const email = userData.get("email")?.valueOf();
    await sendEmail({
      email: String(email),
      emailType: "VERIFY",
      userId: String(userId),
    });
  } catch (error) {
    throw new Error("Email can't be sent");
  }
}

export async function verifyEmail(tokenData:FormData) {
  "use server"
  try {
    const token = tokenData.get("code")?.valueOf()
    await connectMongoDB()
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    
    if (!user) {
      throw new Error();
    }
    
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();
    
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET_TOKEN!
    )
    
    const alg = 'HS256'
    
    const jwttoken = await new jose.SignJWT({ id:user._id, isVerified:user.isVerified})
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setIssuer('XHost')
      .setAudience('urn:example:audience')
      .setExpirationTime('6h')
      .sign(secret)
          
    
    cookies().set("token", jwttoken, {
      httpOnly: true,
    });

  } catch (error) {
    console.log(error);
    
    // throw new Error("Email can't be verified");
  }
}
