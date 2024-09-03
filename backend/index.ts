import express from "express";
import mongoose from "mongoose";
import 'dotenv/config'
import cors from 'cors'
import { Request, Response } from "express";
import {ensureConnection} from './models/userModel'
import router from './routes/userRoutes'

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

app.use('/api', router)

//Test call
app.get('/test' ,(req: Request, res: Response) => {
    res.status(200).send(`Test api is working fine on port:${port}`)
}) 

//Initializing
app.listen(port, () => {
    console.log(`server is listening on ${port} : ${ENV_NAME}`);
})