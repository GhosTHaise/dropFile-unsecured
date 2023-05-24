import express from "express";
import * as dotenv from "dotenv"; 
import multer from "multer";
import fetch from "node-fetch";
dotenv.config();


const Router = express.Router();
//use Stream
const storage = multer.memoryStorage();
const Upload = multer({ storage});

Router.route("/").post(Upload.single("file_upload"),(req,res)=>{
    //file to upload
    const file = req.file;

    const HEADERS = {
        "Authorization": process.env.UPLOAD_TOKEN,
        "X-Bz-File-Name": file.filename ,
        "Content-Type": file.mimetype ,
        "X-Bz-Content-Sha1": "$SHA1_OF_FILE",
        "X-Bz-Info-Author": "unknown", 
        "X-Bz-Server-Side-Encryption": "AES256" 
    }

    const upload_file = async()=>{
        try {
            const request = await fetch(`${process.env.UPLOAD_URL}`,{
                method : "POST",
                headers : HEADERS,
                body : file.buffer
            });
            console.log(request);
        } catch (error) {
            console.log("error :",error);
        }
    }

    upload_file();
});


export default Router;