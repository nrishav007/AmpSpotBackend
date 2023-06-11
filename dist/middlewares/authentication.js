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
exports.Authenticate = void 0;
const index_1 = require("../utils/index");
const index_2 = require("../modules/user/index");
const index_3 = require("../modules/admin/index");
class AuthenticateUser {
    constructor() { }
    authenticate(req, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.headers.authorization) {
                return next(new index_1.VirifiError(400, 'No authorization token sent in the request'));
            }
            if (!req.headers.authorization.startsWith('Bearer')) {
                return next(new index_1.VirifiError(400, 'Authorization token should be of type Bearer token'));
            }
            const token = req.headers.authorization.split(' ')[1];
            const id = yield index_1.JWT.verifyToken(token);
            const user = yield index_2.UserDal.findUserById(id);
            if (user === null) {
                return next(new index_1.VirifiError(400, 'This token user not exist!!!'));
            }
            req.user = user;
            // console.log('req.user = '+req.user);
            next();
        });
    }
    adminAuthenticate(req, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.headers.authorization) {
                return next(new index_1.VirifiError(400, 'No authorization token sent in the request'));
            }
            if (!req.headers.authorization.startsWith('Bearer')) {
                return next(new index_1.VirifiError(400, 'Authorization token should be of type Bearer token'));
            }
            const token = req.headers.authorization.split(' ')[1];
            const id = yield index_1.JWT.verifyToken(token);
            const admin = yield index_3.AdminDal.findAdminById(id);
            req.user = admin;
            // console.log('req.user = '+req.user);
            next();
        });
    }
}
exports.Authenticate = new AuthenticateUser();
//# sourceMappingURL=authentication.js.map