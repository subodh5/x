import connectMongoDB from "@/database/mongoDB";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken'

connectMongoDB()

export async function POST(request: NextRequest){
    try {

        const {username, password}:{username:string, password:string}= await request.json()
        

        const user = await User.findOne({username})
        if(!user){
            return NextResponse.json({error: "Invalid user credentials"}, {status: 400})
        }

        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid user credentials"}, {status: 400})
        }
        
        const tokenData = {
            id: user._id,
            username: user.username,
        }
        //create token
        const token =  jwt.sign(tokenData, process.env.JWT_SECRET_TOKEN!, {expiresIn: "6h"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true, 
            
        })
        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}