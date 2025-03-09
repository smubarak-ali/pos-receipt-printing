import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import { expressPort as port } from "../package.json";
import { routes } from './routes';

const app = express();

const corsOptions = {
    origin: `http://localhost:4200`,
    methods: ['*']
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/health', (req: Request, res: Response) => {
    res.send({ status: 'API is running :)' });
});

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});
