import express from "express";
import * as dotenv from "dotenv";
import { getAccessDropBoxUrl , getAccessTokenDropBox} from "../utils/index.js";

dotenv.config();

const Router = express.Router();

Router.get("/",(req,res) => {
    if(!req.session.tokenAccess)
        res.status(200).json({
            haveAccess : false,
            redirectUrl : getAccessDropBoxUrl()
        })
    else
        res.status(200).json({
            haveAccess : true,
        })
});

Router.post("/",(req,res) => {
    console.log("body :",req.body);
    getAccessTokenDropBox(req.body.code);
});

export default Router;