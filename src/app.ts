import 'reflect-metadata';
import express , {Express , Request , Response} from 'express';
import dotenv from 'dotenv';
import { NOT_FOUND } from 'http-status';
dotenv.config();
const app:Express = express();
const PORT = process.env.PORT || 8000;
import dbconfig from './configs/database.config';

//Connect DB
dbconfig.connectDB();

//Middlewware
app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use('*', (req, res) => res.status(NOT_FOUND).json({
    status: NOT_FOUND,
    message: `Can not GET ${req.originalUrl}`,
}));

app.listen(PORT , () => {  
    console.log(`Server is running on http://localhost:${PORT}`);
})
