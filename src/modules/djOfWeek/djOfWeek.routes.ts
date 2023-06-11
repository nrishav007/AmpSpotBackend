import express, { Request, Response } from "express";
import { VirifiResult } from "../../utils/index";
import { Controller as DjOfWeekController } from './djOfWeek.controller';
import { Authenticate } from "./../../middlewares";

export const router = express.Router();

router.post('/create-dj-of-week', Authenticate.authenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await DjOfWeekController.createDjOfWeek(request);
    response.status(result.status).json(result);
});

router.get('/dj-of-week', Authenticate.authenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await DjOfWeekController.djOfWeek(request);
    response.status(result.status).json(result);
});
