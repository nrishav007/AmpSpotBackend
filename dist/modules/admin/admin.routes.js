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
const admin_controller_1 = require("./admin.controller");
exports.router = express_1.default.Router();
exports.router.post('/login-admin', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_controller_1.Controller.adminLogin(request);
    response.status(result.status).json(result);
}));
exports.router.post('/register-admin', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_controller_1.Controller.registerUser(request);
    response.status(result.status).json(result);
}));
exports.router.post('/update-password', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_controller_1.Controller.updatePassword(request);
    response.status(result.status).json(result);
}));
//# sourceMappingURL=admin.routes.js.map