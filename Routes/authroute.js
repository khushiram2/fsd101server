import express from "express";
import { isVerifiedUser, uniqueEmail } from "../middleware/authmiddleware.js";
import { checkIfUserExist, loginController, preRegisterController, registerController } from "../controllers/authControllers.js";

const router=express.Router()

router.get("/route",(_,res)=>{
    res.send("auth route working fine")
})
router.post("/preregister",uniqueEmail,preRegisterController)
router.get("/:id/check",checkIfUserExist)
router.post("/register",registerController)
router.post("/login",isVerifiedUser,loginController)


export const authRouter=router