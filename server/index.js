import express from "express";
import cors from "cors";
import dropboxRouter from "./routes/dropboxRouter.js";

const app = express();

//middleware
app.use(cors());
app.use(express.json());
const Fourhour = 1000 * 60 * 60 * 4;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: Fourhour },
    resave: false 
}));

app.use("/api/v1/dropbox",dropboxRouter);

app.listen(8080,()=> console.log("App start on : http://localhost:8080"));
