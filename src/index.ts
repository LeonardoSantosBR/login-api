//express cors
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

//routes
import { userRouter } from "./routes/user-routes";
import { authRouter } from "./routes/auth-routes";

const app = express();
app.use(express.json());
app.use(cors());

//routes using
app.use(userRouter);
app.use(authRouter)

export { app };
