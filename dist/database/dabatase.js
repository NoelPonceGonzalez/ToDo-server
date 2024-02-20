"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
const databaseConnection = () => {
    mongoose_1.default.connect(config_1.default.MONGODB_URL)
        .then(() => {
        console.log('Database connection stablished');
    })
        .catch((error) => {
        console.log('error connection to database: ', error);
    });
};
exports.default = databaseConnection;
