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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const middlewares_1 = require("./../../middlewares");
exports.router = express_1.default.Router();
exports.router.post('/register-user', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_controller_1.Controller.registerUser(request);
    response.status(result.status).json(result);
}));
exports.router.post('/create-waitlist', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_controller_1.Controller.createWaitList(request);
    response.status(result.status).json(result);
}));
exports.router.post('/set-user-plug', middlewares_1.Authenticate.authenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_controller_1.Controller.setUserPlug(request);
    response.status(result.status).json(result);
}));
exports.router.post('/set-user-profile', middlewares_1.Authenticate.authenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_controller_1.Controller.setUserProfile(request);
    response.status(result.status).json(result);
}));
exports.router.post('/set-user-sound-preference', middlewares_1.Authenticate.authenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_controller_1.Controller.setUserSoundPreference(request);
    response.status(result.status).json(result);
}));
exports.router.post('/login-user', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_controller_1.Controller.loginUser(request);
    response.status(result.status).json(result);
}));
exports.router.get('/get-user', middlewares_1.Authenticate.authenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_controller_1.Controller.getUser(request);
    response.status(result.status).json(result);
}));
exports.router.post('/update-profile', middlewares_1.Authenticate.authenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_controller_1.Controller.updateProfile(request);
    response.status(result.status).json(result);
}));
exports.router.post('/update-password', middlewares_1.Authenticate.authenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_controller_1.Controller.updatePassword(request);
    response.status(result.status).json(result);
}));
exports.router.get('/get-all-dj', middlewares_1.Authenticate.authenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_controller_1.Controller.getDJList(request);
    response.status(result.status).json(result);
}));
exports.router.get('/get-all-admin-dj', middlewares_1.Authenticate.adminAuthenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_controller_1.Controller.getDJList(request);
    response.status(result.status).json(result);
}));
exports.router.get('/get-all-admin-user', middlewares_1.Authenticate.adminAuthenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_controller_1.Controller.getUserList(request);
    response.status(result.status).json(result);
}));
exports.router.get('/get-dj-detail/:userId', middlewares_1.Authenticate.authenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_controller_1.Controller.getDJDetail(request);
    response.status(result.status).json(result);
}));
exports.router.get('/get-admin-dj-detail/:userId', middlewares_1.Authenticate.adminAuthenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_controller_1.Controller.getDJDetail(request);
    response.status(result.status).json(result);
}));
exports.router.get('/get-admin-user-detail/:userId', middlewares_1.Authenticate.adminAuthenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_controller_1.Controller.getDJDetail(request);
    response.status(result.status).json(result);
}));
exports.router.post('/search-dj', middlewares_1.Authenticate.authenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_controller_1.Controller.searchDj(request);
    response.status(result.status).json(result);
}));
exports.router.post('/search-user-dj', middlewares_1.Authenticate.adminAuthenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_controller_1.Controller.searchUserAndDj(request);
    response.status(result.status).json(result);
}));
exports.router.post('/update-block-status', middlewares_1.Authenticate.adminAuthenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_controller_1.Controller.updateBlockStatus(request);
    response.status(result.status).json(result);
}));
exports.router.get('/count-total-users', middlewares_1.Authenticate.adminAuthenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_controller_1.Controller.countTotalUsers(request);
    response.status(result.status).json(result);
}));
//# sourceMappingURL=user.routes.js.map