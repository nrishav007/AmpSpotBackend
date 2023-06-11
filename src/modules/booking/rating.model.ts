import mongoose from 'mongoose';
import { Schema, model, Types } from 'mongoose';

const ratingSchema = new Schema({

    djId: {  
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    userId: {  
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    rating: {
        type: Number,
    },
    feedback: {
        type: String,
    },
}, {timestamps: true})

export interface IRating {
    _id?: string;
    djId?: string;
    userId?: string;
    rating?: number;
    feedback?: string;
}

export const Rating = mongoose.model("Rating", ratingSchema);