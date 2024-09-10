import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';
import cors from 'cors';
import { Request, Response, NextFunction } from "express";
import { ensureConnection } from './models/userModel';
import router from './routes/userRoutes';
import { loggerMiddleware } from './middlewares/generalMiddleware';
import { ErrorHandler } from './errorHandlers/errorhandle';
import { auth } from './middlewares/authMiddleaware';
import jwt from "jsonwebtoken";

const { PORT, ENV_NAME, MONGO_URL, JWT_SECRET_KEY } = process.env;
const secret = JWT_SECRET_KEY || 'your-secret-key';
const app = express();
const port = PORT || 3000;
const dburi: string = MONGO_URL as string;

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(dburi);
        console.log("Connected with MongoDB successfully");
        await ensureConnection();
    } catch (error) {
        console.log('Error occurred while connecting with DB', error);
        process.exit(1);
    }
};

connectDB();

app.use(express.json());
app.use(cors());

// Logger Middleware
app.use(loggerMiddleware);

// Token Generation Route
app.get('/api/token', (req: Request, res: Response) => {
    const token = jwt.sign({ user: 'testUser' }, secret, { expiresIn: '1h' });
    console.log('Generated Token:', token);
    res.json({ token });
});

// Authenticated Routes
app.use('/api', auth, router);

// Test Route
app.get('/test', (req: Request, res: Response) => {
    res.status(200).send(`Test API is working fine on port: ${port}`);
});

// Error Handling Middleware
app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    res.status(err.status || 500).json({
        success: false,
        message: err.msg || 'Internal Server Error',
    });
});

// Start Server
app.listen(port, () => {
    console.log(`Server is listening on ${port} : ${ENV_NAME}`);
});
