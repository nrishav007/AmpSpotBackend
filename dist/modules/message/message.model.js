"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const messageSchema = new mongoose_2.Schema({
    djId: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: "User"
    },
    userId: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: "User"
    },
    message: {
        type: String,
    },
    userType: {
        type: String,
    },
    reaction: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
exports.Message = mongoose_1.default.model("Message", messageSchema);
//# sourceMappingURL=message.model.js.map