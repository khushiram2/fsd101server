import jwt from "jsonwebtoken"

export const generateWebToken=async(id)=>{
    try {
        return await jwt.sign({id},process.env.SECRET_KEY,{expiresIn:"1d"})
    } catch (error) {
        console.log({where:"token generation",error:error})
    }
}