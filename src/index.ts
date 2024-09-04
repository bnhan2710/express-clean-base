import express , {Express , Request , Response} from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app:Express = express();
const PORT = process.env.PORT || 8000;

app.get('/', (req:Request , res:Response) => {
    res.send('Express + TypeScript Server');
})


app.listen(PORT , () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})