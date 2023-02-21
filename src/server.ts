import express, { json } from 'express';
import 'reflect-metadata';
import cors from 'cors';

import Logger from './logger/logger';
import HelloWorldController from './api/helloworld/helloworld.controller';

const appLogger = Logger('app');

const defaultPort = 3000;
const defaultUrl = 'http://localhost:3000/api';

if (!process.env.PORT) appLogger.warning(`Env variable "PORT" is not defined. Using default value "${defaultPort}".`);
if (!process.env.URL) appLogger.warning(`Env variable "URL" is not defined. Using default value "${defaultUrl}".`);

const PORT = process.env.PORT ?? defaultPort;
const URL = process.env.URL ?? defaultUrl;

const app = express();

app.use(cors());
app.use(json());

app.use('/api', HelloWorldController);

app.listen(PORT, () => { appLogger.info(`API reachable at ${URL}`); });

export default app;
