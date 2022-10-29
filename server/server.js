import express from 'express';
import cors from 'cors';
import router from './api/routes.js';


const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use("/api/activity/practice",router);
app.use("*",(req,res)=>res.status(404).json({Error : 'Not Found!'}));

export default app;