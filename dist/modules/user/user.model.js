"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const UserSchema = new mongoose_2.Schema({
    firstName: {
        type: String,
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        default: 0
    },
    spotify: {
        type: String
    },
    soundCloud: {
        type: String
    },
    sp1: {
        type: String,
        default: ""
    },
    sp2: {
        type: String,
        default: ""
    },
    sp3: {
        type: String,
        default: ""
    },
    sp4: {
        type: String,
        default: ""
    },
    sp5: {
        type: String,
        default: ""
    },
    sp6: {
        type: String,
        default: ""
    },
    sp7: {
        type: String,
        default: ""
    },
    sp8: {
        type: String,
        default: ""
    },
    sp9: {
        type: String,
        default: ""
    },
    sp10: {
        type: String,
        default: ""
    },
    sp11: {
        type: String,
        default: ""
    },
    sp12: {
        type: String,
        default: ""
    },
    youtube: {
        type: String,
    },
    djBio: {
        type: String,
    },
    djName: {
        type: String,
    },
    userType: {
        type: String,
    },
    avgRating: {
        type: Number,
        default: 0
    },
    plug: {
        type: Boolean,
        default: false
    },
    sound: {
        type: Boolean,
        default: false
    },
    profile: {
        type: Boolean,
        default: false
    },
    zipCode: {
        type: String,
    },
    profileImage: {
        type: String,
    },
    blockStatus: {
        type: Boolean,
    }
}, { timestamps: true });
exports.User = mongoose_1.default.model("User", UserSchema);
//# sourceMappingURL=user.model.js.map