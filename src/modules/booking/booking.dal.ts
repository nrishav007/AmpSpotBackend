import { IBooking, Booking } from "./booking.model";
import { IRating, Rating } from "./rating.model";
import { Transaction, ITransaction } from "./transaction.model"
import { Types } from "mongoose";

class BookingDal {
    constructor() {}

    async findDJPendingDeclineBooking(djId?: string): Promise<IBooking[]> {
        const Id = new Types.ObjectId(djId);
        const booking = await Booking.find({ $and: [{djId: djId}, {$or: [{status: "Pending"}, {status: "Decline"}]}]}).populate(["djId", "bookUserId"]);
        return booking;
    }
    async findDJAcceptBooking(djId?: string): Promise<IBooking[]> {
        const Id = new Types.ObjectId(djId);
        const booking = await Booking.find({ $and: [{djId: djId}, {status: "Accepted"}]}).populate(["djId", "bookUserId"]);
        return booking;
    }
    async findUserBooking(userId?: string): Promise<IBooking[]> {
        const Id = new Types.ObjectId(userId);
        const booking = await Booking.find({bookUserId: Id}).populate(["djId", "bookUserId"]);
        return booking;
    }
    async findBookingById(bookingId?: string): Promise<IBooking> {
        const Id = new Types.ObjectId(bookingId);
        const booking = await Booking.findById(Id).populate(["djId", "bookUserId"]);
        return booking;
    }
    async getAllBooking(): Promise<IBooking[]> {
        const booking = await Booking.find().populate(["djId", "bookUserId"]);
        return booking;
    }
    async createBooking(bookingData: any): Promise<IBooking> {
        const booking = await Booking.create(bookingData);
        return booking;
    }
    async updateBookingById(bookingData: any): Promise<IBooking> {
        const booking = await Booking.findByIdAndUpdate(bookingData._id, { $set: bookingData }, {new: true});
        return booking;
    }
    async createRating(ratingData: any): Promise<IRating> {
        const rating = await Rating.create(ratingData);
        return rating;
    }
    async findDJRating(userId?: string): Promise<IBooking[]> {
        const Id = new Types.ObjectId(userId);
        const booking = await Rating.find({djId: Id}).populate(["djId", "userId"]);
        return booking;
    }
    async findDJTransaction(djId?: string): Promise<ITransaction[]> {
        const Id = new Types.ObjectId(djId);
        // const transaction = await Transaction.find({djId: Id}).populate(["djId", "bookUserId"]);
        const transaction = await Transaction.aggregate([
            {
                $match: {
                    $and: [{djId: Id}, { $or: [{isSuccess: true}, {isSuccess: false}]}]
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
    }
    async findUserTransaction(userId?: string): Promise<ITransaction[]> {
        const Id = new Types.ObjectId(userId);
        // const transaction = await Transaction.find({userId: Id}).populate(["djId", "bookUserId"]);
        const transaction = await Transaction.aggregate([
            {
                $match: {
                    $and: [{bookUserId: Id}, { $or: [{isSuccess: true}, {isSuccess: false}]}]
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
    }
    async findDJAvgRating(userId?: string): Promise<IRating[]> {
        const Id = new Types.ObjectId(userId);
        const rating = await Rating.aggregate([
            {
                $match : { djId: Id }
            },
            {
                $group: {
                    "_id": null,
                    avgRating: { $avg: "$rating"}
                }
            }
        ])
        return rating;
    }
    async findDJBooking(djId?: string): Promise<IBooking[]> {
        const Id = new Types.ObjectId(djId);
        const booking = await Booking.find({djId: Id}).populate(["djId", "bookUserId"]);
        return booking;
    }

    async findUserDJRating(djId?: string, userId?: string): Promise<IRating[]> {
        const Id = new Types.ObjectId(djId);
        const user = new Types.ObjectId(userId);
        const rating = await Rating.find({$and: [{djId: Id}, {userId: user}]}).populate(["djId", "userId"]);
        return rating;
    }

    async findDJEventDone(djId?: string): Promise<IBooking[]> {
        const Id = new Types.ObjectId(djId);
        const booking = await Booking.find({ $and: [{djId: Id}, {eventStatus: true}]}).populate(["djId", "bookUserId"]);
        return booking;
    }

    async deleteBookingById(djId?: string): Promise<IBooking[]> {
        const Id = new Types.ObjectId(djId);
        const booking = await Booking.findByIdAndDelete(Id);
        return booking;
    }

    async bookingFilter(filter: any): Promise<IBooking[]> {
        const booking = await Booking.find({$and : filter});
        return booking;
    }

    async countTotalBooking(): Promise<any> {
        const user = await Booking.aggregate([
            {
                $facet: {
                    "Accepted": [
                        { $match: { status: "Accepted"}},
                        { $count: "Accepted"},
                    ],
                    "Pending": [
                        { $match: { status: "Pending"}},
                        { $count: "Pending"},
                    ],
                    "Decline": [
                        { $match: { status: "Decline"}},
                        { $count: "Decline"},
                    ]
                }
            },
            {
                $project: {
                    "Accepted": { $arrayElemAt: ["$Accepted.Accepted", 0]},
                    "Pending": {$arrayElemAt: ["$Pending.Pending", 0]},
                    "Decline": {$arrayElemAt: ["$Decline.Decline", 0]}
                }
            }
        ]);
        return user;
    }

    async createTransaction(transactionData: ITransaction): Promise<ITransaction> {
        const transaction = await Transaction.create(transactionData);
        return transaction;
    }

    async updateTransactionById(transactionData: any): Promise<ITransaction> {
        const transaction = await Transaction.findByIdAndUpdate(transactionData._id, { $set: transactionData }, {new: true});
        return transaction;
    }
}

export const Dal = new BookingDal(); 