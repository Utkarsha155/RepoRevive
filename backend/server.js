import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database.js';
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRoutes.js';
import projectRouter from "./routes/projectRoutes.js";
import requestRouter from "./routes/requestRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import certificateRouter from './routes/certificateRoutes.js';
import messageRouter from "./routes/messageRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js";

dotenv.config();   // it helps in loading the environment variables from .env file into process.env object 
const app = express();   // creating express application instance
const PORT = process.env.PORT || 5000;
connectDB()


app.use(express.json());
app.use(cors({
    origin: [
        "http://localhost:3000"
    ],
    credentials: true
}));   // it enables modern web applications to interact with different apis across the internet, regardless of their origin. It allows web applications to make requests to a different domain than the one that served the web page, which is essential for accessing APIs and resources hosted on other servers.

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use("/api/project", projectRouter);
app.use("/api/request", requestRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/certificate", certificateRouter);
app.use("/api/message", messageRouter);
app.use("/api/dashboard", dashboardRouter);


app.get('/', (req, res) => {
    res.json({ status: "RepoRevive backend running" })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});