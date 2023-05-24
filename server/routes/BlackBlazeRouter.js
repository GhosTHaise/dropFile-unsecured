import express from "express";
import * as dotenv from "dotenv"; 

dotenv.config();


const Router = express.Router();

Router.route("/").post(Upload.single("file_upload"),(req,res)=>{
    //file to upload
    const file = req.file;

    const HEADERS = {
        "Authorization": process.env.AUTHORIZATION_TOKEN,
        "X-Bz-File-Name": file.filename ,
        "Content-Type": file.mimetype ,
        //"X-Bz-Content-Sha1": $SHA1_OF_FILE,
        "X-Bz-Info-Author": "GhosT", 
        "X-Bz-Server-Side-Encryption": "AES256" 
    }

    const upload_file = async()=>{
        try {
            const request = await fetch(`${process.env.API_URL}/b2api/v2/b2_list_file_names`,{
                method : "POST",
                headers : HEADERS,
                body : file.buffer
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    upload_file();
});


export default Router;