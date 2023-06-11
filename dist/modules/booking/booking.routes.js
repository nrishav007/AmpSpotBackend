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
const booking_controller_1 = require("./booking.controller");
const middlewares_1 = require("./../../middlewares");
exports.router = express_1.default.Router();
exports.router.post('/create-booking', middlewares_1.Authenticate.authenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_controller_1.Controller.createBooking(request);
    response.status(result.status).json(result);
}));
exports.router.post('/create-dj-off', middlewares_1.Authenticate.authenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_controller_1.Controller.createDjOff(request);
    response.status(result.status).json(result);
}));
exports.router.get('/delete-booking/:id', middlewares_1.Authenticate.authenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_controller_1.Controller.deleteBooking(request);
    response.status(result.status).json(result);
}));
exports.router.post('/update-booking-status', middlewares_1.Authenticate.authenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_controller_1.Controller.updateBookingStatus(request);
    response.status(result.status).json(result);
}));
exports.router.get('/pending-decline-booking', middlewares_1.Authenticate.authenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_controller_1.Controller.pendingDeclineBooking(request);
    response.status(result.status).json(result);
}));
exports.router.get('/accept-booking', middlewares_1.Authenticate.authenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_controller_1.Controller.acceptBooking(request);
    response.status(result.status).json(result);
}));
exports.router.get('/get-user-booking', middlewares_1.Authenticate.authenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_controller_1.Controller.getUserBooking(request);
    response.status(result.status).json(result);
}));
exports.router.get('/get-admin-user-booking/:id', middlewares_1.Authenticate.adminAuthenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_controller_1.Controller.getAdminUserBooking(request);
    response.status(result.status).json(result);
}));
exports.router.post('/create-rating', middlewares_1.Authenticate.authenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_controller_1.Controller.createRating(request);
    response.status(result.status).json(result);
}));
exports.router.get('/get-all-booking', middlewares_1.Authenticate.adminAuthenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_controller_1.Controller.getAllBooking(request);
    response.status(result.status).json(result);
}));
exports.router.post('/get-user-dj-rating', middlewares_1.Authenticate.authenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_controller_1.Controller.getUserDjRating(request);
    response.status(result.status).json(result);
}));
// router.post('/get-admin-user-dj-rating', Authenticate.adminAuthenticate, async (request: Request, response: Response) => {
//     const result: VirifiResult = await BookingController.getAdminUserDjRating(request);
//     response.status(result.status).json(result);
// });
exports.router.get('/get-dj-rating/:id', middlewares_1.Authenticate.authenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_controller_1.Controller.getDJRating(request);
    response.status(result.status).json(result);
}));
exports.router.get('/get-dj-transaction/:id', middlewares_1.Authenticate.authenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_controller_1.Controller.getDJTransaction(request);
    response.status(result.status).json(result);
}));
exports.router.get('/get-user-transaction/:id', middlewares_1.Authenticate.authenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_controller_1.Controller.getUserTransaction(request);
    response.status(result.status).json(result);
}));
exports.router.get('/get-admin-dj-rating/:id', middlewares_1.Authenticate.adminAuthenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_controller_1.Controller.getDJRating(request);
    response.status(result.status).json(result);
}));
exports.router.get('/get-dj-calendar/:id', middlewares_1.Authenticate.authenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_controller_1.Controller.getDJCalendar(request);
    response.status(result.status).json(result);
}));
exports.router.get('/get-admin-dj-calendar/:id', middlewares_1.Authenticate.adminAuthenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_controller_1.Controller.getDJCalendar(request);
    response.status(result.status).json(result);
}));
exports.router.get('/get-dj-graph/:id', middlewares_1.Authenticate.authenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_controller_1.Controller.getDJGraph(request);
    response.status(result.status).json(result);
}));
exports.router.post('/process-booking', middlewares_1.Authenticate.authenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_controller_1.Controller.payBooking(request);
    response.status(result.status).json(result);
}));
exports.router.post('/complete-transaction', middlewares_1.Authenticate.authenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_controller_1.Controller.completeTransaction(request);
    response.status(result.status).json(result);
}));
exports.router.get('/total-booking-count', middlewares_1.Authenticate.adminAuthenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_controller_1.Controller.totalBookingCount(request);
    response.status(result.status).json(result);
}));
exports.router.post('/admin-booking-search', middlewares_1.Authenticate.adminAuthenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_controller_1.Controller.adminBookingSearch(request);
    response.status(result.status).json(result);
}));
//# sourceMappingURL=booking.routes.js.map