"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
//add name logs file
const infoLogPath = 'logs/info.log';
const errorLogPath = 'logs/error.log';
//crear function
function clearLogFile(logPath) {
    fs_1.default.writeFileSync(logPath, '');
}
clearLogFile(infoLogPath);
clearLogFile(errorLogPath);
