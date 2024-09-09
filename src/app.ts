import 'reflect-metadata';
import express , {Express , Request , Response} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { NOT_FOUND } from 'http-status';
import env from './env'
import v1API from './modules/routes/v1.route';

const PORT : string | undefined = env.ENV_SERVER.PORT || '3000';
const app:Express = express();

//Connection to database
import './configs/database.config';

//Middlewware
app.use(express.json())
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.urlencoded({extended:true}));

//v1 Route
app.use('/api/v1', v1API);

app.use('*', (req : Request, res : Response) => res.status(NOT_FOUND).json({
    status: NOT_FOUND,
    message: `Can not GET ${req.originalUrl}`,
}));

app.listen(PORT, () => {  
    console.log(`Server is running on http://localhost:${PORT}`);
})
