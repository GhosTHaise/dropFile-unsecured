import express from "express"


const Router = express.Router();

Router.route("/").get((req,res)=>{
    res.status(200).json({
        message : "Hello from GhosT"
    })
})

export default Router;