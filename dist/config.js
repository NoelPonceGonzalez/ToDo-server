"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    PORT: process.env.PORT || 5502,
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://root:Noel1@chat-app.pc8xpry.mongodb.net/Blue-note',
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'soadasdcx2dA',
};
exports.default = config;
