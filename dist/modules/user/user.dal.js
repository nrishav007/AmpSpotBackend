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
const user_model_1 = require("./user.model");
const waitList_model_1 = require("./waitList.model");
const mongoose_1 = require("mongoose");
class UserDal {
    constructor() { }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findOne({ email });
            return user;
        });
    }
    findUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(userId);
            const Id = new mongoose_1.Types.ObjectId(userId);
            const user = yield user_model_1.User.findById(Id);
            return user;
        });
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.create(userData);
            return user;
        });
    }
    createWaitList(waitListData) {
        return __awaiter(this, void 0, void 0, function* () {
            const waitList = yield waitList_model_1.WaitList.create(waitListData);
            return waitList;
        });
    }
    updateUserById(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findByIdAndUpdate(userData._id, { $set: userData }, { new: true });
            return user;
        });
    }
    findDJUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.find({ userType: "dj" });
            return user;
        });
    }
    findUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.find({ userType: "user" });
            return user;
        });
    }
    djFilter(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.find({ $and: filter });
            return user;
        });
    }
    countTotalDJAndUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.aggregate([
                {
                    $facet: {
                        "TotalUser": [
                            { $match: { userType: "user" } },
                            { $count: "TotalUser" },
                        ],
                        "TotalDj": [
                            { $match: { userType: "dj" } },
                            { $count: "TotalDj" },
                        ]
                    }
                },
                {
                    $project: {
                        "TotalUser": { $arrayElemAt: ["$TotalUser.TotalUser", 0] },
                        "TotalDj": { $arrayElemAt: ["$TotalDj.TotalDj", 0] }
                    }
                }
            ]);
            return user;
        });
    }
}
exports.Dal = new UserDal();
//# sourceMappingURL=user.dal.js.map