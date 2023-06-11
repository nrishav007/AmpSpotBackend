"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("../utils/index");
require('dotenv').config();
mongoose_1.default.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`, (err) => {
    if (err) {
        throw index_1.Logger.error(err);
    }
    index_1.Logger.info('Database Connection Succeeded');
});
// console.log('cone')
//# sourceMappingURL=mongodb.js.map