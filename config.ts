import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT || 5502,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://root:Noel1@chat-app.pc8xpry.mongodb.net/to-do',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'soadasdcx2dA',
};

export default config;