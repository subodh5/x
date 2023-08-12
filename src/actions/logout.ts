"use server"
import { cookies } from "next/headers"
export default async function clearCookies(){
    try{
        cookies().delete("token")
        return 
     }
    catch(error){
        throw new Error("Logout failed")
    }
}