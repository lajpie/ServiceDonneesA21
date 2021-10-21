import express from 'express';
import dayjs from 'dayjs';

import database from './libs/database.js';

import methodMiddlewares from './middlewares/method.js';
import errorsMiddlewares from './middlewares/errors.js';

import observationRoutes from './routes/observation.routes.js';
database();
const app = express();

app.use(express.json());

app.use(methodMiddlewares);

app.use('/observations',observationRoutes);
app.use(errorsMiddlewares);

export default app;