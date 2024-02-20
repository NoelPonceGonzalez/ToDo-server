import mongoose, {Document} from "mongoose";

interface IUser extends Document {
    name: string;
    password: string;
    email: string;
}

const userSchema = new mongoose.Schema({
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