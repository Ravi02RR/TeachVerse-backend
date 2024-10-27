import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

//======configurations=========


//==============app=============
const app = express();
dotenv.config();


const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
};

//======default middlewares=====

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true }, { limit: '30mb' }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.static('public'));



//======routes==================
import usereRouter from '../routes/user.route.js';


app.use('/api/v1/user', usereRouter);

export { app };