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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dal = void 0;
const booking_model_1 = require("./booking.model");
const rating_model_1 = require("./rating.model");
const transaction_model_1 = require("./transaction.model");
const mongoose_1 = require("mongoose");
class BookingDal {
    constructor() { }
    findDJPendingDeclineBooking(djId) {
        return __awaiter(this, void 0, void 0, function* () {
            const Id = new mongoose_1.Types.ObjectId(djId);
            const booking = yield booking_model_1.Booking.find({ $and: [{ djId: djId }, { $or: [{ status: "Pending" }, { status: "Decline" }] }] }).populate(["djId", "bookUserId"]);
            return booking;
        });
    }
    findDJAcceptBooking(djId) {
        return __awaiter(this, void 0, void 0, function* () {
            const Id = new mongoose_1.Types.ObjectId(djId);
            const booking = yield booking_model_1.Booking.find({ $and: [{ djId: djId }, { status: "Accepted" }] }).populate(["djId", "bookUserId"]);
            return booking;
        });
    }
    findUserBooking(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const Id = new mongoose_1.Types.ObjectId(userId);
            const booking = yield booking_model_1.Booking.find({ bookUserId: Id }).populate(["djId", "bookUserId"]);
            return booking;
        });
    }
    findBookingById(bookingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const Id = new mongoose_1.Types.ObjectId(bookingId);
            const booking = yield booking_model_1.Booking.findById(Id).populate(["djId", "bookUserId"]);
            return booking;
        });
    }
    getAllBooking() {
        return __awaiter(this, void 0, void 0, function* () {
            const booking = yield booking_model_1.Booking.find().populate(["djId", "bookUserId"]);
            return booking;
        });
    }
    createBooking(bookingData) {
        return __awaiter(this, void 0, void 0, function* () {
            const booking = yield booking_model_1.Booking.create(bookingData);
            return booking;
        });
    }
    updateBookingById(bookingData) {
        return __awaiter(this, void 0, void 0, function* () {
            const booking = yield booking_model_1.Booking.findByIdAndUpdate(bookingData._id, { $set: bookingData }, { new: true });
            return booking;
        });
    }
    createRating(ratingData) {
        return __awaiter(this, void 0, void 0, function* () {
            const rating = yield rating_model_1.Rating.create(ratingData);
            return rating;
        });
    }
    findDJRating(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const Id = new mongoose_1.Types.ObjectId(userId);
            const booking = yield rating_model_1.Rating.find({ djId: Id }).populate(["djId", "userId"]);
            return booking;
        });
    }
    findDJTransaction(djId) {
        return __awaiter(this, void 0, void 0, function* () {
            const Id = new mongoose_1.Types.ObjectId(djId);
            // const transaction = await Transaction.find({djId: Id}).populate(["djId", "bookUserId"]);
            const transaction = yield transaction_model_1.Transaction.aggregate([
                {
                    $match: {
                        $and: [{ djId: Id }, { $or: [{ isSuccess: true }, { isSuccess: false }] }]
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "bookUserId",
                        foreignField: "_id",
                        as: "user"
                    }
                },
                {
                    $unwind: {
                        path: "$user"
                    }
                },
                {
                    $project: {
                        "_id": 1,
                        "isSuccess": 1,
                        "amount": 1,
                        "transactionId": 1,
                        "user.email": 1
                    }
                }
            ]);
            return transaction;
        });
    }
    findUserTransaction(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const Id = new mongoose_1.Types.ObjectId(userId);
            // const transaction = await Transaction.find({userId: Id}).populate(["djId", "bookUserId"]);
            const transaction = yield transaction_model_1.Transaction.aggregate([
                {
                    $match: {
                        $and: [{ bookUserId: Id }, { $or: [{ isSuccess: true }, { isSuccess: false }] }]
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "djId",
                        foreignField: "_id",
                        as: "dj"
                    }
                },
                {
                    $unwind: {
                        path: "$dj"
                    }
                },
                {
                    $project: {
                        "_id": 1,
                        "isSuccess": 1,
                        "amount": 1,
                        "transactionId": 1,
                        "dj.djName": 1
                    }
                }
            ]);
            return transaction;
        });
    }
    findDJAvgRating(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const Id = new mongoose_1.Types.ObjectId(userId);
            const rating = yield rating_model_1.Rating.aggregate([
                {
                    $match: { djId: Id }
                },
                {
                    $group: {
                        "_id": null,
                        avgRating: { $avg: "$rating" }
                    }
                }
            ]);
            return rating;
        });
    }
    findDJBooking(djId) {
        return __awaiter(this, void 0, void 0, function* () {
            const Id = new mongoose_1.Types.ObjectId(djId);
            const booking = yield booking_model_1.Booking.find({ djId: Id }).populate(["djId", "bookUserId"]);
            return booking;
        });
    }
    findUserDJRating(djId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const Id = new mongoose_1.Types.ObjectId(djId);
            const user = new mongoose_1.Types.ObjectId(userId);
            const rating = yield rating_model_1.Rating.find({ $and: [{ djId: Id }, { userId: user }] }).populate(["djId", "userId"]);
            return rating;
        });
    }
    findDJEventDone(djId) {
        return __awaiter(this, void 0, void 0, function* () {
            const Id = new mongoose_1.Types.ObjectId(djId);
            const booking = yield booking_model_1.Booking.find({ $and: [{ djId: Id }, { eventStatus: true }] }).populate(["djId", "bookUserId"]);
            return booking;
        });
    }
    deleteBookingById(djId) {
        return __awaiter(this, void 0, void 0, function* () {
            const Id = new mongoose_1.Types.ObjectId(djId);
            const booking = yield booking_model_1.Booking.findByIdAndDelete(Id);
            return booking;
        });
    }
    bookingFilter(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const booking = yield booking_model_1.Booking.find({ $and: filter });
            return booking;
        });
    }
    countTotalBooking() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield booking_model_1.Booking.aggregate([
                {
                    $facet: {
                        "Accepted": [
                            { $match: { status: "Accepted" } },
                            { $count: "Accepted" },
                        ],
                        "Pending": [
                            { $match: { status: "Pending" } },
                            { $count: "Pending" },
                        ],
                        "Decline": [
                            { $match: { status: "Decline" } },
                            { $count: "Decline" },
                        ]
                    }
                },
                {
                    $project: {
                        "Accepted": { $arrayElemAt: ["$Accepted.Accepted", 0] },
                        "Pending": { $arrayElemAt: ["$Pending.Pending", 0] },
                        "Decline": { $arrayElemAt: ["$Decline.Decline", 0] }
                    }
                }
            ]);
            return user;
        });
    }
    createTransaction(transactionData) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield transaction_model_1.Transaction.create(transactionData);
            return transaction;
        });
    }
    updateTransactionById(transactionData) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield transaction_model_1.Transaction.findByIdAndUpdate(transactionData._id, { $set: transactionData }, { new: true });
            return transaction;
        });
    }
}
exports.Dal = new BookingDal();
//# sourceMappingURL=booking.dal.js.map