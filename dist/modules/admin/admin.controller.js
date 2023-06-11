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
exports.Controller = void 0;
const index_1 = require("../../utils/index");
const admin_dal_1 = require("./admin.dal");
const bcrypt_1 = require("bcrypt");
class AdminController {
    constructor() { }
    adminLogin(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email || !password) {
                throw new index_1.VirifiError(401, "Missing Parameter");
            }
            const admin = yield admin_dal_1.Dal.findAdminByEmail(email);
            if (!admin) {
                throw new index_1.VirifiError(401, "Admin Not Exist!!");
            }
            //Password check
            const adminPassword = admin === null || admin === void 0 ? void 0 : admin.password;
            const passwordCheck = yield (0, bcrypt_1.compare)(password, adminPassword);
            if (!passwordCheck) {
                throw new index_1.VirifiError(403, 'Invalid password.');
            }
            const token = yield index_1.JWT.createToken(admin._id);
            const result = new index_1.VirifiResult(200, 'Signin Successful', { token, admin });
            return result;
        });
    }
    registerUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            // if (!email || !password) {
            //     throw new VirifiError(401, 'Missing Parameters');
            // }
            const passwordHash = yield (0, bcrypt_1.hash)("123", 10);
            const userData = {
                fullName: "Admin",
                email: "admin1@gmail.com",
                password: passwordHash,
            };
            yield admin_dal_1.Dal.createAdmin(userData);
            const result = new index_1.VirifiResult(200, 'Signin Successful');
            return result;
        });
    }
    updatePassword(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { currentPassword, newPassword, adminId } = req.body;
            //check user in userDB
            const admin = yield admin_dal_1.Dal.findAdminById(adminId);
            const passwordCorrect = yield (0, bcrypt_1.compare)(currentPassword, admin.password);
            if (!passwordCorrect) {
                throw new index_1.VirifiError(401, 'Invalid Password Current password');
            }
            const newPasswordHash = yield (0, bcrypt_1.hash)(newPassword, 10);
            const userData = {
                _id: adminId,
                password: newPasswordHash
            };
            const updateAdmin = yield admin_dal_1.Dal.updateAdminById(userData);
            const result = new index_1.VirifiResult(200, ' Password Updated Successfull', { admin: updateAdmin });
            return result;
        });
    }
}
exports.Controller = new AdminController();
//# sourceMappingURL=admin.controller.js.map