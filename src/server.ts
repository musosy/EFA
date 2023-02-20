import express, { json } from 'express';
import dotenv from 'dotenv';
import 'reflect-metadata';
import cors from 'cors';

import HelloWorldController from './helloworld/helloworld.controller';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(json());

app.use('/api', HelloWorldController);

app.listen(PORT, () => {
    console.info('Hello World endpoint at http://localhost:3000/api');
});

export default app;
