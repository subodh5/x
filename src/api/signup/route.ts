import connectMongoDB from "@/database/mongoDB";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
// import { sendEmail } from "@/helpers/mailer";

connectMongoDB();

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      username,
      email,
      password,
      confirmPassword,
    }: {
      name: string;
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
    } = await request.json();

    //check if password  and confirmPassword matches
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Password doesn't match" },
        { status: 400 }
      );
    }

    //check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    //send verification email

    // await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
