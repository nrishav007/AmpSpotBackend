import express, { Request, Response } from "express";
import { VirifiResult } from "../../utils/index";
import { Controller as AdminController } from './admin.controller';
import { Authenticate } from "./../../middlewares";

export const router = express.Router();

router.post('/login-admin', async (request: Request, response: Response) => {
    const result: VirifiResult = await AdminController.adminLogin(request);
    response.status(result.status).json(result);
});

router.post('/register-admin', async (request: Request, response: Response) => {
    const result: VirifiResult = await AdminController.registerUser(request);
    response.status(result.status).json(result);
})

router.post('/update-password', async (request: Request, response: Response) => {
    const result: VirifiResult = await AdminController.updatePassword(request);
    response.status(result.status).json(result);
})