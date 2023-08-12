import mongoose from "mongoose";

 const connectMongoDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL!) 
    }
    catch(err)
    {
        console.log("Connection failed");
        console.log(err)
    }
}
export default connectMongoDB