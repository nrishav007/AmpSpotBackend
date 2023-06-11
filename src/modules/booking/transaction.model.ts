import mongoose from 'mongoose';
import { Schema, model, Types } from 'mongoose';

const transactionSchema = new Schema({

    djId: {  
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    bookUserId: {  
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    bookingId: {
        type: Schema.Types.ObjectId,
        ref: "Booking"
    },
    amount: {
        type: Number,
        default: 0
    },
    checkoutToken: {
        type: String,
    },
    secretToken: {
        type: String,
    },
    isExpire: {
        type: Boolean,
    },
    isSuccess: {
        type: Boolean,
    },
    approvalCode: {
        type: String,
    },
    cardToken: {
        type: String,
    },
    customerCode: {
        type: String
    },
    dateCreated: {
        type: String
    },
    invoiceNumber: {
        type: String
    },
    transactionId: {
        type: String
    },
    status: {
        type: String
    },
    hash: {
        type: String
    }
}, {timestamps: true})

export interface ITransaction {
    _id?: string;
    djId?: string;
    bookUserId?: string;
    bookingId?: string;
    amount?: number;
    checkoutToken?: string;
    secretToken?: string;
    isExpire?: boolean;
    isSuccess?: boolean;
    approvalCode?: string;
    cardToken?: string
    customerCode?: string;
    dateCreated?: string;
    invoiceNumber?: string;
    transactionId?: string;
    status?: string;
    hash?: string;
}

export const Transaction = mongoose.model("Transaction", transactionSchema);