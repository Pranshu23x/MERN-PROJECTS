import mongoose from "mongoose"

export const connectDB= async()=>{
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI)
    }
    catch (error){
        console.error(`Error : ${error.message}`)
        process.exit(1); //code 1 mean faliure, 0 mean sucess
    }
}