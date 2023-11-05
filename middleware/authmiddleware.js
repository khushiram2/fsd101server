import { UserModel } from "../Model/userModel.js"
import { sendMail } from "../controllers/SendMail.js"
import { generateOTP } from "../utilities/otpUtils.js"


export const uniqueEmail=async(req,res,next)=>{
try {
    const {email}=req.body.userData
    const userexist=await UserModel.findOne({email:email})
    if(!userexist){
        next()
    }else{
       res.status(206).send("user already registerd please login")
    }
} catch (error) {
    console.log(error)
    res.status(500).send("some error occured try again")
}
}

export const isVerifiedUser=async(req,res,next)=>{
    try {
        const {email}=req.body
        const userexist=await UserModel.findOne({email:email})
         if(userexist.verified===true){

             req.userDetails=userexist
             next()
        }else{
            const Otp=await generateOTP(userexist,res)
            await sendMail(userexist.email,res,Otp)
            res.status(206).send({message:"verify youself by filling OTP",id:userexist._id})
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("some error occured")
    }
    }