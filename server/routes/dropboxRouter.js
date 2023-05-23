import express from "express"
import * as dotenv from "dotenv"
import {Dropbox} from "dropbox";
import multer from "multer";
import {Date_Now_String_For_Dir_Name ,getAccessDropBoxUrl} from "../utils/index.js";


dotenv.config();

const Router = express.Router();

//use Stream
const storage = multer.memoryStorage();
const Upload = multer({ storage});

//Create new instance of DropBox


//GET
Router.route("/").get((req,res)=>{
    res.status(200).json({
        message : "Hello from GhosT"
    })
})

//POST
Router.route("/").post(Upload.single("file_upload"),(req,res)=>{
    console.log(req.session.tokenAccess)
    const dbx = new Dropbox({
        accessToken : "sl.Be5yoEUiAV9h98W1Unol3XYumhG6ZY4EeySm1ODL61k6DqpBy36U3ZdvYSCyUvYfOWGV4JUUbePZg13uqsnoO4g6YDgMhfz3bdWvG4fqLgWoBFfhjD0L71NHL41tYLOxWVTB-9U",
        //clientId : process.env.DROPBOX_APP_KEY,
        //clientSecret : process.env.DROPBOX_APP_CLIENT
    });
    const file = req.file;
    //console.log(file)

    
    //verify Access Token
/*     dbx.usersGetCurrentAccount()
    .then(()=>{
        console.log("APi Key still available !");
    }).catch((error) => {
        if(error.response && error.response.status == 401){
            //const authUrl = dbx.get
            console.log(error);
        }else{
            console.log(error);
        }
    }); */

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