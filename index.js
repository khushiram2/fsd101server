import express from "express";
import cors from "cors"
import * as dotenv from  "dotenv"
import { authRouter } from "./Routes/authroute.js";
import { databaseConnection } from "./database/DatabaseConnection.js";
dotenv.config()
const app=express()
app.use(express.json())
app.use(cors())
app.use("/auth",authRouter)
await databaseConnection()
app.get("/",(_,res)=>{
    res.send("app working fine")
})


app.listen(process.env.PORT,()=>console.log("app started on",process.env.PORT))

