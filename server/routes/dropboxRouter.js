import express from "express"
import * as dotenv from "dotenv"
import {Dropbox} from "dropbox";

dotenv.config();
const Router = express.Router();

//Create new instance of DropBox
const dbx = new Dropbox({accessToken : process.env.DROPBOX_ACCESS_TOKEN});
Router.route("/").get((req,res)=>{
    res.status(200).json({
        message : "Hello from GhosT"
    })
})

Router.route("/").post((req,res)=>{

})
export default Router;