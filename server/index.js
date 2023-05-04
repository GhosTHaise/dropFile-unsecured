import express from "express";
import cors from "cors";
import dropboxRouter from "../routes/dropboxRouter";

const app = express();

//middleware
app.use(cors);
app.use(express.json())

app.use("/api/v1/dropbox",dropboxRouter);

app.listen(8080,()=> console.log("App start on : http://localhost:8080"));
