import express from "express"
import * as dotenv from "dotenv"
import {Dropbox} from "dropbox";
import multer from "multer";
import {Date_Now_String_For_Dir_Name} from "../utils";
dotenv.config();

const Router = express.Router();

const storage = multer.memoryStorage();
const Upload = multer({ storage});

//Create new instance of DropBox
const dbx = new Dropbox({accessToken : process.env.DROPBOX_ACCESS_TOKEN});

Router.route("/").get((req,res)=>{
    res.status(200).json({
        message : "Hello from GhosT"
    })
})

Router.route("/").post(Upload.single("file_upload"),(req,res)=>{
    const file = req.file;

    dbx.filesUpload({ 
        path : Date_Now_String_For_Dir_Name()+"/"+file.filename,
        contents : file.buffer
    }).then(()=>{
        console.log("File upload");
        res.status(200).json({
            message : "File Uploaded"
        })
    }).catch(e =>{
        res.status(500).json({
            message : "Something get wrong : "+ e
        })
    })
});

export default Router;