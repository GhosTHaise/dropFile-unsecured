import express from "express";
import cors from "cors";
const app = express();

//middleware
app.use(cors);


app.listen(8080,()=> console.log("App start on : http://localhost:8080"));
