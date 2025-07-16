import express from "express"
import multer from "multer";
import { uploadFile } from "./utils/uploadToBlob.js";
import dotenv from 'dotenv'
dotenv.config()
const app=express();
app.get("/hi",(req,res)=>{
    return res.json("Hello");
})
app.post("/upload",multer().single('file'),async(req,res)=>{
    try { 
        const url = await uploadFile(req.file.buffer, req.file.mimetype, "12f4", req.file.originalname);
       return res.json({ url });
      } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Upload failed' });
      }
})
app.listen(process.env.PORT,()=>{
    console.log("Hello world")
})