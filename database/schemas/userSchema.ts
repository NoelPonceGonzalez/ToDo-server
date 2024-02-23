import mongoose, { Document, Schema } from "mongoose";

interface INote {
    _id: mongoose.Types.ObjectId,
    category: 'Staff' | 'Today' | 'Work' | 'Shopping' | 'Planed' | 'Home';
    title: string;
    text: string;
}

interface IUser extends Document {
    name: string;
    password: string;
    email: string;
    notes: INote[];
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    notes: [
        {
            category: {
                type: String,
                enum: ['Staff', 'Today', 'Work', 'Shopping', 'Planed', 'Home'],
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
            text: {
                type: String,
                required: true,
            },
        },
    ],
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
