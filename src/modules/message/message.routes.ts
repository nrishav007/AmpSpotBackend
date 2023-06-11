import express, { Request, Response } from "express";
import { VirifiResult } from "../../utils/index";
import { Controller as MessageController } from './message.controller';
import { Authenticate } from "../../middlewares";

export const router = express.Router();

router.post('/create-message', Authenticate.authenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await MessageController.createMessage(request);
    response.status(result.status).json(result);
});

router.get('/get-user-message-list/:id', Authenticate.authenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await MessageController.getUserMessageList(request);
    response.status(result.status).json(result);
});

router.get('/get-dj-message-list/:id', Authenticate.authenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await MessageController.getDjMessageList(request);
    response.status(result.status).json(result);
});

router.post('/all-message', Authenticate.authenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await MessageController.allMessage(request);
    response.status(result.status).json(result);
});

router.post('/update-message-reaction', Authenticate.authenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await MessageController.updateMessage(request);
    response.status(result.status).json(result);
});
