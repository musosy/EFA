import express, { json } from 'express';
import 'reflect-metadata';
import cors from 'cors';

import Logger from './logger/logger';
import HelloWorldController from './api/helloworld/helloworld.controller';

const appLogger = Logger('app');

const defaultPort = 3000;
const defaultUrl = 'http://localhost:3000/api';

if (!process.env.PORT)
    appLogger.warning(
        `Env variable "PORT" is not defined. Using default value "${defaultPort}".`
    );
if (!process.env.URL)
    appLogger.warning(
        `Env variable "URL" is not defined. Using default value "${defaultUrl}".`
    );

const PORT = process.env.PORT ?? defaultPort;
const URL = process.env.URL ?? defaultUrl;

const app = express();

app.use(cors());
app.use(json());

app.use('/api', HelloWorldController);

const server = app.listen(PORT, () => {
    appLogger.info(`API reachable at ${URL}`);
});

// ! This is only used to close server after the tests
app.get('/shutdown', (_req, res) => {
    if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'dev')
        server.close();
    res.send('Bye bye');
});

export default app;
