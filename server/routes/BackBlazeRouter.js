import express from "express";
import * as dotenv from "dotenv"; 
import multer from "multer";
import fetch from "node-fetch";
import { createHash } from "crypto";
import { Date_Now_String_For_Dir_Name } from "../utils/index.js";
import jwt from "jsonwebtoken"

dotenv.config();


const Router = express.Router();
//use Stream
const storage = multer.memoryStorage();
const Upload = multer({ storage});

Router.route("/").post(Upload.single("file_upload"), async (req,res)=>{
    //file to upload
    /* console.log(req.body);
    return ; */
    const file = req.file;
    //get info
    const {authorizationToken,uploadUrl}= jwt.verify(req.body.jwt_token,process.env.JWT_SECRET_KEY);
    console.log(authorizationToken);
    //console.log(createHash("sha1").update(file.buffer).digest("hex"));
    const HEADERS = {
        "Authorization": authorizationToken,
        "X-Bz-File-Name": Date_Now_String_For_Dir_Name()+"/"+file.originalname ,
        "Content-Type": file.mimetype ,
        "X-Bz-Content-Sha1": createHash("sha1").update(file.buffer).digest("hex"),
        "X-Bz-Info-Author": "unknown", 
        "X-Bz-Server-Side-Encryption": "AES256" 
    }
    console.log(HEADERS);
    const upload_file = async()=>{
        try {
            const request = await fetch(`${uploadUrl}`,{
                method : "POST",
                headers : HEADERS,
                body : file.buffer
            });
            //console.log(request);
            res.status(200).json({
                message : "Success to upload : "+file.originalname
            })
        } catch (error) {
            res.status(400).json({
                message : error
            });
        }
    }

    upload_file();
});


export default Router;