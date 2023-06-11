"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitList = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const waitListSchema = new mongoose_2.Schema({
    userType: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    socialMediaType: {
        type: String,
    },
    socialMediaUserName: {
        type: String,
    }
}, { timestamps: true });
exports.WaitList = mongoose_1.default.model("WaitList", waitListSchema);
//# sourceMappingURL=waitList.model.js.map