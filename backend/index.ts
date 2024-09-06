import express from "express";
import mongoose from "mongoose";
import 'dotenv/config'
import cors from 'cors'
import { Request, Response, NextFunction } from "express";
import {ensureConnection} from './models/userModel'
import router from './routes/userRoutes'
import {loggerMiddleware} from './middlewares/generalMiddleware'
import {ErrorHandler} from './errorHandlers/errorhandle';

const{PORT, ENV_NAME, MONGO_URL} = process.env
const app = express();
const port = PORT || 3000;
const dburi:string = MONGO_URL as string;

//making connection with db
const connetDB =async () => {
    try{
        await mongoose.connect(dburi);  
            console.log("connected with mongoDB successfully");
            await ensureConnection();

    }catch(error){
        console.log('Error occor while connection with db', error)
        process.exit(1);
    }
 }

//calling db
connetDB();

app.use(express.json())
app.use(cors());

//error handling middleware

// app.use((err:any, req:Request, res:Response, next:NextFunction) => {
//     let {status= 500, msg="Something went wrong"} = err;
//     res.status(status).send(msg);
// })

app.use(loggerMiddleware);

app.use('/api', router)

//Test call
app.get('/test', (req: Request, res: Response) => {
    res.status(200).send(`Test API is working fine on port: ${port}`);
}); 

// Error handling 
app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    console.log("error arrived")
    console.error(err);

    res.status(err.status || 500).json({
        success: false,
        message: err.msg || 'Internal Server Error',
    });
});


//Initializing
app.listen(port, () => {
    console.log(`server is listening on ${port} : ${ENV_NAME}`);
})