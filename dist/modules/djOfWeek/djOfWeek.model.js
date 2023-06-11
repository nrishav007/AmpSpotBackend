"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DjOfWeek = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const djOfWeekSchema = new mongoose_2.Schema({
    djId: {
        type: mongoose_2.Schema.Types.ObjectId,
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
}, { timestamps: true });
exports.DjOfWeek = mongoose_1.default.model("DjOfWeek", djOfWeekSchema);
//# sourceMappingURL=djOfWeek.model.js.map