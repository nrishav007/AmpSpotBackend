"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const transactionSchema = new mongoose_2.Schema({
    djId: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: "User"
    },
    bookUserId: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: "User"
    },
    bookingId: {
        type: mongoose_2.Schema.Types.ObjectId,
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
}, { timestamps: true });
exports.Transaction = mongoose_1.default.model("Transaction", transactionSchema);
//# sourceMappingURL=transaction.model.js.map