import mongoose from "mongoose";

export const databaseConnection= async()=>{
    try {
        await mongoose.connect(process.env.URL)
        console.log("databse connected via Mongoose")
    } catch (error) {
        console.log(error)
    }
}