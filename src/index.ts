import express , {Express , Request , Response} from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app:Express = express();
const PORT = process.env.PORT || 8000;

//Middlewware
app.use(express.json())



app.listen(PORT , () => {  
    console.log(`Server is running on http://localhost:${PORT}`);
})
