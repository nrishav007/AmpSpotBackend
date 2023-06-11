import mongoose from 'mongoose';
import { Schema, model, Types } from 'mongoose';

const UserSchema = new Schema({

    firstName: {  
        type: String,
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },      
    password: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        default: 0
    },
    spotify: {
        type: String
    },
    soundCloud: {
        type: String
    },
    sp1: {
        type: String,
        default: ""
    },
    sp2: {
        type: String,
        default: ""
    },
    sp3: {
        type: String,
        default: ""
    },
    sp4: {
        type: String,
        default: ""
    },
    sp5: {
        type: String,
        default: ""
    },
    sp6: {
        type: String,
        default: ""
    },
    sp7: {
        type: String,
        default: ""
    },
    sp8: {
        type: String,
        default: ""
    },
    sp9: {
        type: String,
        default: ""
    },
    sp10: {
        type: String,
        default: ""
    },
    sp11: {
        type: String,
        default: ""
    },
    sp12: {
        type: String,
        default: ""
    },
    youtube: {
        type: String,
    },
    djBio: {
        type: String,
    },
    djName: {
        type: String,
    },
    userType: {
        type: String,
    },
    avgRating: {
        type: Number,
        default: 0
    },
    plug: {
        type: Boolean,
        default: false
    },
    sound: {
        type: Boolean,
        default: false
    },
    profile: {
        type: Boolean,
        default: false
    },
    zipCode: {
        type: String,
    },
    profileImage: {
        type: String,
    },
    blockStatus: {
        type: Boolean,
    }
}, {timestamps: true})

export interface IUser {
    _id?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    spotify?: string;
    soundCloud?: string;
    rate?: number;
    sp1?: string;
    sp2?: string;
    sp3?: string;
    sp4?: string;
    sp5?: string;
    sp6?: string;
    sp7?: string;
    sp8?: string;
    sp9?: string;
    sp10?: string;
    sp11?: string;
    sp12?: string;
    youtube?: string;
    djBio?: string;
    djName?: string;
    userType?: string;
    avgRating?: number;
    plug?: boolean;
    sound?: boolean;
    profile?: boolean;
    zipCode?: string;
    profileImage?: string;
    profileImageBuffer?: any;
    blockStatus?: boolean;
}

export const User = mongoose.model("User", UserSchema);