import  express, {Request, Response} from 'express';
import mongoose from 'mongoose';

import User from '../database/schemas/userSchema';

import logger from '../logs/logger';

const router = express.Router();

router.post('/addTasks', async (req: Request, res: Response) => {
    const { name, category, title, text } = req.body;

    try {
        const user = await User.findOne({ name });

        if (!user) {
            logger.error(`Error finding user: ${user}`);
        }

        const newUser = new User(user);

        const newTask = {
            _id: new mongoose.Types.ObjectId(), 
            category: category,
            title: title,
            text: text,
        };

        newUser.notes.push(newTask);

        await newUser.save();

        logger.info(`New task added in category ${category}`);
        res.status(200).json({ success: true });
    } catch (error: any) {
        logger.error(`Error al agregar tarea con nombre de usuario: ${name}`);
        return res.status(500).json({ success: false, error: 'Error interno del servidor', mongooseError: error.message });
    }
});

router.get('/showTasks', async (req: Request, res: Response) => {
    const { name } = req.query;

    try {
        if (!name) {
            return res.status(400).json({ success: false, error: 'Missing user name in the request' });
        }

        const user = await User.findOne({ name });

        if (!user) {
            logger.error(`Error finding user: ${name}`);
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        const userTasks = user.notes || [];

        return res.status(200).json({ success: true, tasks: userTasks });
    } catch (error: any) {
        logger.error('Error retrieving tasks');
        return res.status(500).json({ success: false, error: 'Internal server error', mongooseError: error.message });
    }
});

router.delete('/deleteTasks', async (req: Request, res: Response) => {
    const { name, taskId } = req.query;

    try {
        if (!taskId) {
            logger.error('no task');
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        const user = await User.findOne({ name });

        if (!user) {
            logger.error('Error user not found tasks');
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        const updatedNotes = user.notes.filter(task => task._id.toString() !== taskId);

        user.notes = updatedNotes;

        await user.save();

        logger.info(`task deleted from user ${name}`);
        return res.status(200).json({ success: true, message: 'Task deleted successfully' });
    } catch (error: any) {
        logger.error('Error deleting tasks');
        return res.status(500).json({ success: false, error: 'Internal server error', mongooseError: error.message });
    }
});

export default router;