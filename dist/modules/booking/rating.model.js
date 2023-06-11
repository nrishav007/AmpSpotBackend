"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rating = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const ratingSchema = new mongoose_2.Schema({
    djId: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: "User"
    },
    userId: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: "User"
    },
    rating: {
        type: Number,
    },
    feedback: {
        type: String,
    },
}, { timestamps: true });
exports.Rating = mongoose_1.default.model("Rating", ratingSchema);
//# sourceMappingURL=rating.model.js.map