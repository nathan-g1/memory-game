import { json } from 'express';
import cors from 'cors';
import App from "./app";

import ScoreController from './api/controller/score.controller';

const PORT = process.env.PORT || 3000;

const controllers = [
    new ScoreController(),
];

const middlewares = [
    json(),
    cors()
];

// Create app
const app = new App({
    port: Number(PORT),
    middlewares,
    controllers
});

// Start the app
app.listen();
