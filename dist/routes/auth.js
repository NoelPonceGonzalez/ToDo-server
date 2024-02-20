"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema_1 = __importDefault(require("../database/schemas/userSchema"));
const logger_1 = __importDefault(require("../logs/logger"));
const config_1 = __importDefault(require("../config"));
const router = express_1.default.Router();
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, password } = req.body;
    try {
        const existingEmail = yield userSchema_1.default.findOne({ email });
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        if (existingEmail) {
            logger_1.default.info(`User register: ${name}`);
            return res.status(400).json({ success: false, });
        }
        const newUser = new userSchema_1.default({
            name: name,
            password: hashedPassword,
            email: email,
        });
        yield newUser.save();
        logger_1.default.info(`New user created with name: ${name} and email: ${email}`);
        res.json({ success: true, user: newUser });
    }
    catch (error) {
        logger_1.default.error(`Error seaving new user with name: ${name} and email: ${email}`);
        res.status(500).json({ success: false, });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password } = req.body;
    try {
        const user = yield userSchema_1.default.findOne({ name });
        if (!user) {
            logger_1.default.info(`Error finding user; ${name}`);
            return res.status(400).json({ succes: false });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (isPasswordValid) {
            const token = jsonwebtoken_1.default.sign({ user: user.name }, config_1.default.JWT_SECRET_KEY, { expiresIn: '1h' });
            res.cookie('tokenCookie', token, { maxAge: 1000 * 60 * 40, httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' });
            logger_1.default.info(`User logged in: ${user.name}`);
            return res.json({ succes: true, user: user, token: token });
        }
        else {
            logger_1.default.info(`Invalid password for user ${user.name}`);
            return res.status(401).json({ succes: false });
        }
    }
    catch (error) {
        logger_1.default.error(`Error login with user with name: ${name}`);
        return res.status(500).json({ success: false });
    }
}));
exports.default = router;
