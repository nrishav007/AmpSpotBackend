"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const AdminSchema = new mongoose_2.Schema({
    fullName: {
        type: String,
    },
    email: {
        type: String
    },
    password: {
        type: String,
    },
}, { timestamps: true });
exports.Admin = mongoose_1.default.model("Admin", AdminSchema);
//# sourceMappingURL=admin.model.js.map