"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("./user");
const booking_1 = require("./booking");
const djOfWeek_1 = require("./djOfWeek");
const message_1 = require("./message");
const admin_1 = require("./admin");
const router = express_1.default.Router();
router.use('/user', user_1.UserRouter);
router.use('/booking', booking_1.BookingRouter);
router.use('/djOfWeek', djOfWeek_1.DjOfWeekRouter);
router.use('/message', message_1.MessageRouter);
router.use('/admin', admin_1.AdminRouter);
exports.default = router;
//# sourceMappingURL=routes.js.map