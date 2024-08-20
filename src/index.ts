//express cors
import express from "express";
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();

//routes
//...

const app = express();
app.use(express.json());
app.use(cors());

//routes using
//...

export { app };
