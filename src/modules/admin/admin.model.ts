import mongoose from 'mongoose';
import { Schema, model, Types } from 'mongoose';

const AdminSchema = new Schema({

    fullName: {
        type: String,
    },
    email: {
        type: String
    },
    password: {
        type: String,
    },
}, {timestamps: true})

export interface IAdmin {
    _id?: string;
    fullName?: string;
    email?: string;
    password?: string;
}

export const Admin = mongoose.model("Admin", AdminSchema);
