import { OTPModel } from "../Model/OtpModel.js"
import { UserModel } from "../Model/userModel.js"
import { hashPassword } from "./authutil.js"




export const createNewUser=async (req)=>{
    const {userData}=req.body
    const hashedPassword=await hashPassword(userData.password)
    const newRegistedUser=await UserModel.create({...userData,password:hashedPassword})
    return newRegistedUser
}


export const findOtpForUserByUserId=async(userId)=>{
    return await OTPModel.findOne({userId:userId}).populate("userId")
}

export const verifyUserById=async(id)=>{
    return await UserModel.findOneAndUpdate({_id:id},{$set:{verified:true}},{new:true})
}