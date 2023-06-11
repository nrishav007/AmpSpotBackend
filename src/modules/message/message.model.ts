import mongoose from 'mongoose';
import { Schema, model, Types } from 'mongoose';

const messageSchema = new Schema({

    djId: {  
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    message: {
        type: String,
    },
    userType: {
        type: String,
    },
    reaction: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

export interface IMessage {
    _id?: string;
    djId?: string;
    userId?: string;
    message?: string;
    userType?: string;
    reaction?: boolean;
}

export const Message = mongoose.model("Message", messageSchema);