import express, { Request, Response } from "express";
import { VirifiResult } from "../../utils/index";
import { Controller as BookingController } from './booking.controller';
import { Authenticate } from "./../../middlewares";

export const router = express.Router();

router.post('/create-booking', Authenticate.authenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await BookingController.createBooking(request);
    response.status(result.status).json(result);
});

router.post('/create-dj-off', Authenticate.authenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await BookingController.createDjOff(request);
    response.status(result.status).json(result);
});

router.get('/delete-booking/:id', Authenticate.authenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await BookingController.deleteBooking(request);
    response.status(result.status).json(result);
});

router.post('/update-booking-status', Authenticate.authenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await BookingController.updateBookingStatus(request);
    response.status(result.status).json(result);
});

router.get('/pending-decline-booking', Authenticate.authenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await BookingController.pendingDeclineBooking(request);
    response.status(result.status).json(result);
});

router.get('/accept-booking', Authenticate.authenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await BookingController.acceptBooking(request);
    response.status(result.status).json(result);
});

router.get('/get-user-booking', Authenticate.authenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await BookingController.getUserBooking(request);
    response.status(result.status).json(result);
});

router.get('/get-admin-user-booking/:id', Authenticate.adminAuthenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await BookingController.getAdminUserBooking(request);
    response.status(result.status).json(result);
});

router.post('/create-rating', Authenticate.authenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await BookingController.createRating(request);
    response.status(result.status).json(result);
});

router.get('/get-all-booking', Authenticate.adminAuthenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await BookingController.getAllBooking(request);
    response.status(result.status).json(result);
});

router.post('/get-user-dj-rating', Authenticate.authenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await BookingController.getUserDjRating(request);
    response.status(result.status).json(result);
});

// router.post('/get-admin-user-dj-rating', Authenticate.adminAuthenticate, async (request: Request, response: Response) => {
//     const result: VirifiResult = await BookingController.getAdminUserDjRating(request);
//     response.status(result.status).json(result);
// });

router.get('/get-dj-rating/:id', Authenticate.authenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await BookingController.getDJRating(request);
    response.status(result.status).json(result);
});

router.get('/get-dj-transaction/:id', Authenticate.authenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await BookingController.getDJTransaction(request);
    response.status(result.status).json(result);
});

router.get('/get-user-transaction/:id', Authenticate.authenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await BookingController.getUserTransaction(request);
    response.status(result.status).json(result);
});

router.get('/get-admin-dj-rating/:id', Authenticate.adminAuthenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await BookingController.getDJRating(request);
    response.status(result.status).json(result);
});

router.get('/get-dj-calendar/:id', Authenticate.authenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await BookingController.getDJCalendar(request);
    response.status(result.status).json(result);
});

router.get('/get-admin-dj-calendar/:id', Authenticate.adminAuthenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await BookingController.getDJCalendar(request);
    response.status(result.status).json(result);
});

router.get('/get-dj-graph/:id', Authenticate.authenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await BookingController.getDJGraph(request);
    response.status(result.status).json(result);
});

router.post('/process-booking', Authenticate.authenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await BookingController.payBooking(request);
    response.status(result.status).json(result);
});

router.post('/complete-transaction', Authenticate.authenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await BookingController.completeTransaction(request);
    response.status(result.status).json(result);
});

router.get('/total-booking-count', Authenticate.adminAuthenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await BookingController.totalBookingCount(request);
    response.status(result.status).json(result);
});

router.post('/admin-booking-search', Authenticate.adminAuthenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await BookingController.adminBookingSearch(request);
    response.status(result.status).json(result);
});
