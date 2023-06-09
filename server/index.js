import express from "express";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";

import dropboxRouter from "./routes/dropboxRouter.js";
import AuthRouter from "./routes/auth.js";
import backblazeRouter from "./routes/BackBlazeRouter.js";
const app = express();          //1 hour
const Fourhour = 1000 * 60 * 60 * 4;
//middleware
app.use(cors());
//app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/dropbox",dropboxRouter);
app.use("/api/v1/auth",AuthRouter);
app.use("/api/v1/backblaze",backblazeRouter);

app.listen(8080,()=> console.log("App start on : http://localhost:8080"));
