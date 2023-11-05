import { UserModel } from "../Model/userModel.js"
import { comparePassword } from "../utilities/authutil.js"
import { createNewUser, findOtpForUserByUserId, verifyUserById } from "../utilities/databasequerries.js"
import { generateOTP } from "../utilities/otpUtils.js"
import { generateWebToken } from "../utilities/token.js"
import { sendMail } from "./SendMail.js"



export const loginController=async(req,res)=>{
try {
    const {password} = req.body
    const userDetails = req.userDetails
    const hashedPassword=userDetails.password
    const match = await comparePassword(password,hashedPassword)
    if(match){
        const token = await generateWebToken(userDetails._id)
        res.status(200).send({name:userDetails.name,email:userDetails.email,token:token,id:userDetails._id})
    }else{
        throw new Error("password didn't match")
    }

} catch (error) {
    console.log(error)
    res.status(500).send("invalid credentials")
}
}
export const preRegisterController=async(req,res)=>{
    try {
        const newRegistedUser=await createNewUser(req)
        const Otp=await generateOTP(newRegistedUser,res)
        if(Otp){
            await sendMail(newRegistedUser.email,res,Otp)
            res.status(200).send({message:"otp send sucessfully to your email",id:newRegistedUser._id})
        }else{
            throw new Error("somethig went wronf please try again")
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).send("some problem occured please try again")
    }
}

export const registerController=async(req,res)=>{
    try {
        const {userId,OTP}=req.body
        const Otp=await findOtpForUserByUserId(userId)
        const match=await comparePassword(OTP,Otp.hashedOTP)
        if(match){
            const updateduser=await verifyUserById(Otp.userId._id)
            res.status(200).send({message:"user verified Sucessfully", email:updateduser.email,name:updateduser.name})
        }else{
            throw new Error("otp didn't match")
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).send("can not register the user")
    }
}

export const checkIfUserExist=async(req,res)=>{
    try {
        const {id}=req.params
        const userexist=await UserModel.findOne({_id:id})
        if(userexist){
            res.status(200).send("ok")
        }else{
            throw new Error("user doesn't exist in database")
        }
    } catch (error) {
        res.status(500).send("some error occured")
    }

}