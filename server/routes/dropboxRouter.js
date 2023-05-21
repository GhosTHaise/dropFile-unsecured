import express from "express"
import * as dotenv from "dotenv"
import {Dropbox} from "dropbox";
import multer from "multer";
import {Date_Now_String_For_Dir_Name ,getAccessDropBoxUrl} from "../utils/index.js";
import queryString from "query-string";

dotenv.config();

const Router = express.Router();

//use Stream
const storage = multer.memoryStorage();
const Upload = multer({ storage});

//Create new instance of DropBox
const dbx = new Dropbox({
    //accessToken : process.env.DROPBOX_ACCESS_TOKEN,
    clientId : process.env.DROPBOX_APP_KEY,
    clientSecret : process.env.DROPBOX_APP_CLIENT
});

//GET
Router.route("/").get((req,res)=>{
    res.status(200).json({
        message : "Hello from GhosT"
    })
})

//POST
Router.route("/").post(Upload.single("file_upload"),(req,res)=>{
    const file = req.file;
    //console.log(file)

    
    //verify Access Token
    dbx.usersGetCurrentAccount()
    .then(()=>{
        console.log("APi Key still available !");
    }).catch((error) => {
        if(error.response && error.response.status == 401){
            //const authUrl = dbx.get
            console.log(error);
        }else{
            console.log(error);
        }
    });

    dbx.filesUpload({ 
        path : "/"+Date_Now_String_For_Dir_Name()+"/"+file.originalname,
        contents : file.buffer
    }).then(()=>{
        console.log("File upload");
        res.status(200).json({
            message : "File Uploaded"
        })
    }).catch(e =>{
        console.log(e)
        res.status(500).json({
            message : "Something get wrong : "+ e
        })
    })
});

export default Router;