import exrpess from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import config from './config';
import databaseConnection from './database/dabatase';

import authRoutes from './routes/auth';

const app = exrpess();

app.use(
    cors({
        origin: true,
        credentials: true
    })
);

app.use(cookieParser());
app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.listen(config.PORT, () => {
    console.log(`server is running at port ${config.PORT}`);
    databaseConnection();
})