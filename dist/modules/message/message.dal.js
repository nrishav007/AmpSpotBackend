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
const message_model_1 = require("./message.model");
const mongoose_1 = require("mongoose");
class MessageDal {
    constructor() { }
    createMessage(messageData) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield message_model_1.Message.create(messageData);
            return message;
        });
    }
    getUserMessageList(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const Id = new mongoose_1.Types.ObjectId(userId);
            const message = yield message_model_1.Message.aggregate([
                {
                    $match: {
                        userId: Id,
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
                    $group: {
                        "_id": "$dj",
                    }
                }
            ]);
            return message;
        });
    }
    getDjMessageList(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const Id = new mongoose_1.Types.ObjectId(userId);
            const message = yield message_model_1.Message.aggregate([
                {
                    $match: {
                        djId: Id,
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "user"
                    }
                },
                {
                    $group: {
                        "_id": "$user",
                    }
                }
            ]);
            return message;
        });
    }
    findAllMessage(userId, djId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userIdObj = new mongoose_1.Types.ObjectId(userId);
            const djIdObj = new mongoose_1.Types.ObjectId(djId);
            const message = yield message_model_1.Message.find({ $and: [{ userId: userIdObj }, { djId: djIdObj }] });
            return message;
        });
    }
    updateMessageById(messageData) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield message_model_1.Message.findByIdAndUpdate(messageData._id, { $set: messageData }, { new: true });
            return message;
        });
    }
}
exports.Dal = new MessageDal();
//# sourceMappingURL=message.dal.js.map