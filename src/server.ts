import express, { json } from 'express';
import 'reflect-metadata';
import cors from 'cors';
import * as dotenv from 'dotenv';
import DOTENV_FILE_PATH from './config/env';
import HelloWorldController from './helloworld/helloworld.controller';

dotenv.config({
    path: DOTENV_FILE_PATH,
    debug: true,
});

const PORT = process.env.PORT ?? 3000;
const URL = process.env.URL ?? 'http://localhost:3000';
const app = express();

app.use(cors());
app.use(json());

app.use('/api', HelloWorldController);

app.listen(PORT, () => {
    console.info(`Hello World endpoint at ${URL}`);
});

export default app;
