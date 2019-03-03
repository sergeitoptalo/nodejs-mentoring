import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        required: [true, 'Email is required'],
        type: String,
    },
    password: {
        min: [3, 'Password should contain more symbols'],
        type: String,
    },
    userId: Number,
    username: String,
});

export const User = mongoose.model('User', userSchema);
