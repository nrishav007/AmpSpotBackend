import mongoose from 'mongoose';
import { Schema, model, Types } from 'mongoose';

const djOfWeekSchema = new Schema({

    djId: {  
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    addDuration: {
        type: String,
    },
    cost: {
        type: Number,
    },
    location: {
        type: String,
    },
    review: {
        type: String,
    },
    image: {
        type: String,
    }
}, {timestamps: true})

export interface IDjOfWeek {
    _id?: string;
    djId?: string;
    addDuration?: string;
    cost?: number;
    location?: string;
    review?: string;
    image?: string
}

export const DjOfWeek = mongoose.model("DjOfWeek", djOfWeekSchema);