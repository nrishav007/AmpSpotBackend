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
const admin_model_1 = require("./admin.model");
const mongoose_1 = require("mongoose");
class AdminDal {
    constructor() { }
    findAdminByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield admin_model_1.Admin.findOne({ email });
            return user;
        });
    }
    createAdmin(adminData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield admin_model_1.Admin.create(adminData);
            return user;
        });
    }
    findAdminById(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            const Id = new mongoose_1.Types.ObjectId(adminId);
            const admin = yield admin_model_1.Admin.findById(Id);
            return admin;
        });
    }
    updateAdminById(adminData) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield admin_model_1.Admin.findByIdAndUpdate(adminData._id, { $set: adminData }, { new: true });
            return admin;
        });
    }
}
exports.Dal = new AdminDal();
//# sourceMappingURL=admin.dal.js.map