"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const bookingSchema = new mongoose_2.Schema({
    djId: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: "User"
    },
    bookUserId: {
        type: mongoose_2.Schema.Types.ObjectId,
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
}, { timestamps: true });
exports.Booking = mongoose_1.default.model("Booking", bookingSchema);
//# sourceMappingURL=booking.model.js.map