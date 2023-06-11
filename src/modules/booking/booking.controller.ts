import { Request } from "express";
import { VirifiError, VirifiResult, Logger, JWT, MailConfig } from "../../utils/index";
import { IBooking } from "./booking.model";
import { Dal as BookingDal } from "./booking.dal";
import { IRating } from "./rating.model";
import { ITransaction } from "./transaction.model";
import { IUser, UserDal } from "./../user";
import axios from "axios";
import { readFileSync } from "fs";
require('dotenv').config();

class BookingController {
    constructor() { }

    async createBooking(req: Request): Promise<VirifiResult> {
        
        const { djId, event, eventDuration, time, date, location, listEquipments, additionalEquipments }: { djId: string, event: string, eventDuration: number, time: string, date: string, location: string, listEquipments: string, additionalEquipments: string } = req.body;

        const djData: IUser = await UserDal.findUserById(djId);

        const minRate = Number(djData.rate)/60;
        const bookingRate: string = (minRate * Number(eventDuration)).toFixed(2)

        const bookingData: IBooking = {
            djId,
            bookUserId: req.user._id,
            event,
            eventDuration,
            bookingRate: Number(bookingRate),
            time,
            date,
            location,
            listEquipments,
            additionalEquipments,
            status: "Pending",
        }

        const booking: IBooking = await BookingDal.createBooking(bookingData);

        const result = new VirifiResult(200, 'Booking Created', {booking});
        return result;
    }

    async createDjOff(req: Request): Promise<VirifiResult> {
        
        const { djId, date }: { djId: string, date: string } = req.body;

        const bookingData: IBooking = {
            djId,
            date,
            status: "Off"
        }

        const booking: IBooking = await BookingDal.createBooking(bookingData);

        const result = new VirifiResult(200, 'Dj Off Updated', {booking});
        return result;
    }

    async updateBookingStatus(req: Request): Promise<VirifiResult> {

        const { bookingId, status }: { bookingId: string, status: string } = req.body;

        const bookingData: IBooking = {
            _id: bookingId,
            status
        }
        const booking: IBooking = await BookingDal.updateBookingById(bookingData);
        // Logger.info('Got Data');
        const result = new VirifiResult(200, 'Booking Status Updated', {booking});
        return result;
    }

    async pendingDeclineBooking(req: Request): Promise<VirifiResult> {
        
        
        const booking: IBooking[] = await BookingDal.findDJPendingDeclineBooking(req.user._id);

        const result = new VirifiResult(200, 'All Pending Cancel Booking', {booking});
        return result;
    }

    async acceptBooking(req: Request): Promise<VirifiResult> {
        
        
        const booking: IBooking[] = await BookingDal.findDJAcceptBooking(req.user._id);

        const result = new VirifiResult(200, 'All Confirm Booking', {booking});
        return result;
    }

    async getUserBooking(req: Request): Promise<VirifiResult> {
        
        const booking: IBooking[] = await BookingDal.findUserBooking(req.user._id);

        const result = new VirifiResult(200, 'All User Booking', {booking});
        return result;
    }

    async getAdminUserBooking(req: Request): Promise<VirifiResult> {
        
        const booking: IBooking[] = await BookingDal.findUserBooking(req.params.id);

        const result = new VirifiResult(200, 'All User Booking', {booking});
        return result;
    }

    async createRating(req: Request): Promise<VirifiResult> {
        
        const { djId, rating, feedback }: { djId: string, rating: number, feedback: string } = req.body;

        const ratingData: IRating = {
            djId,
            userId: req.user._id,
            rating,
            feedback
        }

        const ratings: IRating = await BookingDal.createRating(ratingData);
        const avgRating: any[] = await BookingDal.findDJAvgRating(djId);
        const djAvgRating: number = Math.round(avgRating[0].avgRating * 100) / 100;

        const userData: IUser = {
            _id: djId,
            avgRating: djAvgRating 
        }
        await UserDal.updateUserById(userData);

        const result = new VirifiResult(200, 'Rating Created', {ratings});
        return result;
    }

    async payBooking(req: Request): Promise<VirifiResult> {
        
        const { djId, bookingId, bookingRate }: { djId: string, bookingId: string, bookingRate: number } = req.body;

        const extra: number = (bookingRate * 0.05).toFixed(2) as unknown as number
        const amount: number = Number(bookingRate) + Number(extra)

        console.log("Boolking amount ", amount)

        const resp = await axios({
            method: 'post',
            url: process.env.API,
            data: {
                amount,
                currency: "USD",
                paymentType: "purchase"
            },
            headers: {
                "account-id": process.env.ACCOUNT_ID,
                "api-token": process.env.API_TOKEN 
            }
        });

        console.log("API Resp", resp.data)

        const transactionData: ITransaction = {
            djId,
            bookingId,
            bookUserId: req.user._id,
            amount,
            secretToken: resp.data.secretToken,
            checkoutToken: resp.data.checkoutToken,
            status: "Pending"
        }

        const transaction: ITransaction = await BookingDal.createTransaction(transactionData)

        const result = new VirifiResult(200, 'Transaction Process', {checkoutToken: resp.data.checkoutToken, backendTransactionId: transaction._id});
        return result;
    }

    async completeTransaction(req: Request): Promise<VirifiResult> {
        
        const { backendTransactionId, isSuccess, approvalCode, cardToken, customerCode, dateCreated, invoiceNumber, transactionId, status, hash }: { backendTransactionId: string, isSuccess: boolean, approvalCode: string, cardToken: string, customerCode: string, dateCreated: string, invoiceNumber: string, transactionId: string, status: string, hash: string } = req.body;

        const transactionData: ITransaction = {
            _id: backendTransactionId,
            isSuccess,
            approvalCode,
            cardToken,
            customerCode,
            dateCreated,
            invoiceNumber,
            transactionId,
            status,
            hash
        }

        const transaction: ITransaction = await BookingDal.updateTransactionById(transactionData);

        if(`${isSuccess}` == 'true'){
            const bookingData: IBooking = {
                _id: transaction.bookingId,
                paymentStatus: true
            }

            await BookingDal.updateBookingById(bookingData);
        }else{

            console.log("Eleseee runnn")
            const bookingData: IBooking = {
                _id: transaction.bookingId,
                paymentStatus: false
            }

            await BookingDal.updateBookingById(bookingData);   
        }

        const booking : IBooking = await BookingDal.findBookingById(transaction.bookingId)

        const result = new VirifiResult(200, 'Payment Status Updated', {booking});
        return result;
    }

    async getDJRating(req: Request): Promise<VirifiResult> {
        
        const rating: IRating[] = await BookingDal.findDJRating(req.params.id); 
        
        const result = new VirifiResult(200, 'DJ Rating', {rating});
        return result;
    }

    async getDJCalendar(req: Request): Promise<VirifiResult> {
        
        const djBooking: IBooking[] = await BookingDal.findDJBooking(req.params.id);

        const result = new VirifiResult(200, 'DJ Booking', {djBooking});
        return result;
    }

    async getDJTransaction(req: Request): Promise<VirifiResult> {
        
        const transaction: ITransaction[] = await BookingDal.findDJTransaction(req.params.id); 
        
        const result = new VirifiResult(200, 'DJ Transaction', {transaction});
        return result;
    }

    async getUserTransaction(req: Request): Promise<VirifiResult> {
        
        const transaction: ITransaction[] = await BookingDal.findUserTransaction(req.params.id); 
        
        const result = new VirifiResult(200, 'User Transaction', {transaction});
        return result;
    }

    async deleteBooking(req: Request): Promise<VirifiResult> {
        
        const djBooking: IBooking[] = await BookingDal.deleteBookingById(req.params.id);

        const result = new VirifiResult(200, 'DJ Booking', {djBooking});
        return result;
    }

    async getDJGraph(req: Request): Promise<VirifiResult> {
        
        const djBooking: IBooking[] = await BookingDal.findDJEventDone(req.params.id);

        const result = new VirifiResult(200, 'DJ Booking', {djBooking});
        return result;
    }

    async getUserDjRating(req: Request): Promise<VirifiResult> {

        const { djId }: { djId: string } = req.body;
        const userId = req.user._id;
        
        const rating: IRating[] = await BookingDal.findUserDJRating(djId, userId);

        const result = new VirifiResult(200, 'DJ Booking', {rating});
        return result;
    }

    async getAdminUserDjRating(req: Request): Promise<VirifiResult> {

        const { djId, userId }: { djId: string, userId: string } = req.body;
        
        const rating: IRating[] = await BookingDal.findUserDJRating(djId, userId);

        const result = new VirifiResult(200, 'DJ Booking', {rating});
        return result;
    }

    async totalBookingCount(req: Request): Promise<VirifiResult> {

        const count: any[] = await BookingDal.countTotalBooking();

        const result = new VirifiResult(200, 'Total Booking Count', {count});
        return result;
    }

    async getAllBooking(req: Request): Promise<VirifiResult> {

        const booking: IBooking[] = await BookingDal.getAllBooking();

        const result = new VirifiResult(200, 'Get All Booking', {booking});
        return result;
    }

    async adminBookingSearch(req: Request): Promise<VirifiResult> {
        console.log(req.body)

        const { firstDate, lastDate }: { firstDate: string, lastDate: string} = req.body;
        
        let searchArray: any[] = [];
        
        if(firstDate && lastDate){
            const newFirstDate = new Date(firstDate);
            const newLastDate = new Date(lastDate);
            searchArray.push({createdAt: {$gte: newFirstDate, $lt: newLastDate}})
        }

        const booking = await BookingDal.bookingFilter(searchArray);
        
        const result = new VirifiResult(200, 'Booking List', {booking});
        return result;
    }
}

export const Controller = new BookingController();