"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const index_1 = require("../../utils/index");
const booking_dal_1 = require("./booking.dal");
const user_1 = require("./../user");
const axios_1 = __importDefault(require("axios"));
require('dotenv').config();
class BookingController {
    constructor() { }
    createBooking(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { djId, event, eventDuration, time, date, location, listEquipments, additionalEquipments } = req.body;
            const djData = yield user_1.UserDal.findUserById(djId);
            const minRate = Number(djData.rate) / 60;
            const bookingRate = (minRate * Number(eventDuration)).toFixed(2);
            const bookingData = {
                djId,
                bookUserId: req.user._id,
                event,
                eventDuration,
                bookingRate: Number(bookingRate),
                time,
                date,
                location,
                listEquipments,
                additionalEquipments,
                status: "Pending",
            };
            const booking = yield booking_dal_1.Dal.createBooking(bookingData);
            const result = new index_1.VirifiResult(200, 'Booking Created', { booking });
            return result;
        });
    }
    createDjOff(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { djId, date } = req.body;
            const bookingData = {
                djId,
                date,
                status: "Off"
            };
            const booking = yield booking_dal_1.Dal.createBooking(bookingData);
            const result = new index_1.VirifiResult(200, 'Dj Off Updated', { booking });
            return result;
        });
    }
    updateBookingStatus(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { bookingId, status } = req.body;
            const bookingData = {
                _id: bookingId,
                status
            };
            const booking = yield booking_dal_1.Dal.updateBookingById(bookingData);
            // Logger.info('Got Data');
            const result = new index_1.VirifiResult(200, 'Booking Status Updated', { booking });
            return result;
        });
    }
    pendingDeclineBooking(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const booking = yield booking_dal_1.Dal.findDJPendingDeclineBooking(req.user._id);
            const result = new index_1.VirifiResult(200, 'All Pending Cancel Booking', { booking });
            return result;
        });
    }
    acceptBooking(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const booking = yield booking_dal_1.Dal.findDJAcceptBooking(req.user._id);
            const result = new index_1.VirifiResult(200, 'All Confirm Booking', { booking });
            return result;
        });
    }
    getUserBooking(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const booking = yield booking_dal_1.Dal.findUserBooking(req.user._id);
            const result = new index_1.VirifiResult(200, 'All User Booking', { booking });
            return result;
        });
    }
    getAdminUserBooking(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const booking = yield booking_dal_1.Dal.findUserBooking(req.params.id);
            const result = new index_1.VirifiResult(200, 'All User Booking', { booking });
            return result;
        });
    }
    createRating(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { djId, rating, feedback } = req.body;
            const ratingData = {
                djId,
                userId: req.user._id,
                rating,
                feedback
            };
            const ratings = yield booking_dal_1.Dal.createRating(ratingData);
            const avgRating = yield booking_dal_1.Dal.findDJAvgRating(djId);
            const djAvgRating = Math.round(avgRating[0].avgRating * 100) / 100;
            const userData = {
                _id: djId,
                avgRating: djAvgRating
            };
            yield user_1.UserDal.updateUserById(userData);
            const result = new index_1.VirifiResult(200, 'Rating Created', { ratings });
            return result;
        });
    }
    payBooking(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { djId, bookingId, bookingRate } = req.body;
            const extra = (bookingRate * 0.05).toFixed(2);
            const amount = Number(bookingRate) + Number(extra);
            console.log("Boolking amount ", amount);
            const resp = yield (0, axios_1.default)({
                method: 'post',
                url: process.env.API,
                data: {
                    amount,
                    currency: "USD",
                    paymentType: "purchase"
                },
                headers: {
                    "account-id": process.env.ACCOUNT_ID,
                    "api-token": process.env.API_TOKEN
                }
            });
            console.log("API Resp", resp.data);
            const transactionData = {
                djId,
                bookingId,
                bookUserId: req.user._id,
                amount,
                secretToken: resp.data.secretToken,
                checkoutToken: resp.data.checkoutToken,
                status: "Pending"
            };
            const transaction = yield booking_dal_1.Dal.createTransaction(transactionData);
            const result = new index_1.VirifiResult(200, 'Transaction Process', { checkoutToken: resp.data.checkoutToken, backendTransactionId: transaction._id });
            return result;
        });
    }
    completeTransaction(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { backendTransactionId, isSuccess, approvalCode, cardToken, customerCode, dateCreated, invoiceNumber, transactionId, status, hash } = req.body;
            const transactionData = {
                _id: backendTransactionId,
                isSuccess,
                approvalCode,
                cardToken,
                customerCode,
                dateCreated,
                invoiceNumber,
                transactionId,
                status,
                hash
            };
            const transaction = yield booking_dal_1.Dal.updateTransactionById(transactionData);
            if (`${isSuccess}` == 'true') {
                const bookingData = {
                    _id: transaction.bookingId,
                    paymentStatus: true
                };
                yield booking_dal_1.Dal.updateBookingById(bookingData);
            }
            else {
                console.log("Eleseee runnn");
                const bookingData = {
                    _id: transaction.bookingId,
                    paymentStatus: false
                };
                yield booking_dal_1.Dal.updateBookingById(bookingData);
            }
            const booking = yield booking_dal_1.Dal.findBookingById(transaction.bookingId);
            const result = new index_1.VirifiResult(200, 'Payment Status Updated', { booking });
            return result;
        });
    }
    getDJRating(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const rating = yield booking_dal_1.Dal.findDJRating(req.params.id);
            const result = new index_1.VirifiResult(200, 'DJ Rating', { rating });
            return result;
        });
    }
    getDJCalendar(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const djBooking = yield booking_dal_1.Dal.findDJBooking(req.params.id);
            const result = new index_1.VirifiResult(200, 'DJ Booking', { djBooking });
            return result;
        });
    }
    getDJTransaction(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield booking_dal_1.Dal.findDJTransaction(req.params.id);
            const result = new index_1.VirifiResult(200, 'DJ Transaction', { transaction });
            return result;
        });
    }
    getUserTransaction(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield booking_dal_1.Dal.findUserTransaction(req.params.id);
            const result = new index_1.VirifiResult(200, 'User Transaction', { transaction });
            return result;
        });
    }
    deleteBooking(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const djBooking = yield booking_dal_1.Dal.deleteBookingById(req.params.id);
            const result = new index_1.VirifiResult(200, 'DJ Booking', { djBooking });
            return result;
        });
    }
    getDJGraph(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const djBooking = yield booking_dal_1.Dal.findDJEventDone(req.params.id);
            const result = new index_1.VirifiResult(200, 'DJ Booking', { djBooking });
            return result;
        });
    }
    getUserDjRating(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { djId } = req.body;
            const userId = req.user._id;
            const rating = yield booking_dal_1.Dal.findUserDJRating(djId, userId);
            const result = new index_1.VirifiResult(200, 'DJ Booking', { rating });
            return result;
        });
    }
    getAdminUserDjRating(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { djId, userId } = req.body;
            const rating = yield booking_dal_1.Dal.findUserDJRating(djId, userId);
            const result = new index_1.VirifiResult(200, 'DJ Booking', { rating });
            return result;
        });
    }
    totalBookingCount(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield booking_dal_1.Dal.countTotalBooking();
            const result = new index_1.VirifiResult(200, 'Total Booking Count', { count });
            return result;
        });
    }
    getAllBooking(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const booking = yield booking_dal_1.Dal.getAllBooking();
            const result = new index_1.VirifiResult(200, 'Get All Booking', { booking });
            return result;
        });
    }
    adminBookingSearch(req) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { firstDate, lastDate } = req.body;
            let searchArray = [];
            if (firstDate && lastDate) {
                const newFirstDate = new Date(firstDate);
                const newLastDate = new Date(lastDate);
                searchArray.push({ createdAt: { $gte: newFirstDate, $lt: newLastDate } });
            }
            const booking = yield booking_dal_1.Dal.bookingFilter(searchArray);
            const result = new index_1.VirifiResult(200, 'Booking List', { booking });
            return result;
        });
    }
}
exports.Controller = new BookingController();
//# sourceMappingURL=booking.controller.js.map