import mongoose from 'mongoose';
import { Schema, model, Types } from 'mongoose';

const waitListSchema = new Schema({

    userType: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    socialMediaType: {
        type: String,
    },
    socialMediaUserName: {
        type: String,
    }
}, {timestamps: true})

export interface IWaitList {
    _id?: string;
    userType?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    socialMediaType?: string
    socialMediaUserName?: string

}

export const WaitList = mongoose.model("WaitList", waitListSchema);