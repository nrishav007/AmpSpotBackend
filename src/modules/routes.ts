import express from 'express'
import { UserRouter } from './user';
import { BookingRouter } from "./booking";
import { DjOfWeekRouter } from "./djOfWeek";
import { MessageRouter } from "./message";
import { AdminRouter } from './admin';

const router = express.Router();

router.use('/user', UserRouter);
router.use('/booking', BookingRouter);
router.use('/djOfWeek', DjOfWeekRouter);
router.use('/message', MessageRouter);
router.use('/admin', AdminRouter);  

export default router;