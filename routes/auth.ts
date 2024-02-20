import  express, {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../database/schemas/userSchema';

import logger from '../logs/logger';
import config from '../config';

const router = express.Router();


router.post('/register', async (req: Request, res: Response) => {
    const { email, name, password } = req.body;
  
    try {
      const existingEmail = await User.findOne({ email });
      const hashedPassword = await bcrypt.hash(password, 10);
  
      if (existingEmail) {
        logger.info(`User register: ${name}`);
        return res.status(400).json({ success: false, });
      }
  
      const newUser = new User({
        name: name,
        password: hashedPassword,
        email: email,
      });
  
      await newUser.save();
  
      logger.info(`New user created with name: ${name} and email: ${email}`);
      res.json({ success: true, user: newUser });
    } catch (error: any) {
      logger.error(`Error seaving new user with name: ${name} and email: ${email}`);
      res.status(500).json({ success: false, });
    }
});

router.post('/login', async (req: Request, res: Response) => {
    const {name, password} = req.body;

    try {
        const user = await User.findOne({ name });

        if(!user) {
            logger.info(`Error finding user; ${name}`);
            return res.status(400).json({ succes: false });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(isPasswordValid) {
            const token = jwt.sign({ user: user.name }, config.JWT_SECRET_KEY, { expiresIn: '1h'});

            res.cookie('tokenCookie', token, { maxAge: 1000 * 60 * 40, httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' });

            logger.info(`User logged in: ${user.name}`);

            return res.json({ succes: true, user: user, token: token});
        } else {
            logger.info(`Invalid password for user ${user.name}`);
            return res.status(401).json({ succes: false });
        }
    }catch(error: any) {
        logger.error(`Error login with user with name: ${name}`);
        return res.status(500).json({ success: false });
    }
});

export default router;