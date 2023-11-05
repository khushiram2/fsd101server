import bcrypt from "bcryptjs"

export const hashPassword=async(originalPassword)=>{
    try {
        const hash=await bcrypt.hash(originalPassword,10)
        return hash
    } catch (error) {
        console.log({where:"hashing the password",error:error})
    }

}


export const comparePassword=async(originalPassword,hashedpassword)=>{
    try {
        return await bcrypt.compare(originalPassword,hashedpassword)
    } catch (error) {
        console.log({where:"comparing the password",error:error})

    }
}