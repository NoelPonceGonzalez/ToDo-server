import mongoose from 'mongoose';

import config from '../config';

const databaseConnection = (): void => {
    mongoose.connect(config.MONGODB_URL)
        .then(() => {
            console.log('Database connection stablished')
        })
        .catch((error: any) => {
            console.log('error connection to database: ', error)
        })
} 

export default databaseConnection;