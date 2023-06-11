import mongoose from 'mongoose';
import { Schema, model, Types } from 'mongoose';

const bookingSchema = new Schema({

    djId: {  
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    bookUserId: {  
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    event: {
        type: String,
    },
    eventDuration: {
        type: Number,
    },
    time: {
        type: String,
    },
    date: {
        type: String,
    },
    location: {
        type: String,
    },
    listEquipments: {
        type: String,
    },
    additionalEquipments: {
        type: String,
    },
    status: {
        type: String,
    },
    eventStatus: {
        type: Boolean,
        default: false
    },
    ratingStatus: {
        type: Boolean,
        default: false
    },
    paymentStatus: {
        type: Boolean,
        default: false
    },
    bookingRate: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

export interface IBooking {
    _id?: string;
    djId?: string;
    bookUserId?: string;
    event?: string;
    eventDuration?: number;
    time?: string;
    date?: string;
    location?: string;
    listEquipments?: string;
    additionalEquipments?: string;
    status?: string;
    eventStatus?: string;
    ratingStatus?: string;
    paymentStatus?: boolean
    bookingRate?: number;
}

export const Booking = mongoose.model("Booking", bookingSchema);