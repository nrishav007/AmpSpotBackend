import express, { Request, Response } from "express";
import { VirifiResult } from "../../utils/index";
import { Controller as UserController } from './user.controller';
import { Authenticate } from "./../../middlewares";

export const router = express.Router();

router.post('/register-user', async (request: Request, response: Response) => {
    const result: VirifiResult = await UserController.registerUser(request);
    response.status(result.status).json(result);
});

router.post('/create-waitlist', async (request: Request, response: Response) => {
    const result: VirifiResult = await UserController.createWaitList(request);
    response.status(result.status).json(result);
})

router.post('/set-user-plug', Authenticate.authenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await UserController.setUserPlug(request);
    response.status(result.status).json(result);
});

router.post('/set-user-profile', Authenticate.authenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await UserController.setUserProfile(request);
    response.status(result.status).json(result);
});

router.post('/set-user-sound-preference', Authenticate.authenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await UserController.setUserSoundPreference(request);
    response.status(result.status).json(result);
});

router.post('/login-user', async (request: Request, response: Response) => {
    const result: VirifiResult = await UserController.loginUser(request);
    response.status(result.status).json(result);
});

router.get('/get-user', Authenticate.authenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await UserController.getUser(request);
    response.status(result.status).json(result);
})

router.post('/update-profile', Authenticate.authenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await UserController.updateProfile(request);
    response.status(result.status).json(result);
})

router.post('/update-password', Authenticate.authenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await UserController.updatePassword(request);
    response.status(result.status).json(result);
})

router.get('/get-all-dj', Authenticate.authenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await UserController.getDJList(request);
    response.status(result.status).json(result);
})

router.get('/get-all-admin-dj', Authenticate.adminAuthenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await UserController.getDJList(request);
    response.status(result.status).json(result);
})

router.get('/get-all-admin-user', Authenticate.adminAuthenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await UserController.getUserList(request);
    response.status(result.status).json(result);
})

router.get('/get-dj-detail/:userId', Authenticate.authenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await UserController.getDJDetail(request);
    response.status(result.status).json(result);
})

router.get('/get-admin-dj-detail/:userId', Authenticate.adminAuthenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await UserController.getDJDetail(request);
    response.status(result.status).json(result);
})

router.get('/get-admin-user-detail/:userId', Authenticate.adminAuthenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await UserController.getDJDetail(request);
    response.status(result.status).json(result);
})

router.post('/search-dj', Authenticate.authenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await UserController.searchDj(request);
    response.status(result.status).json(result);
})

router.post('/search-user-dj', Authenticate.adminAuthenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await UserController.searchUserAndDj(request);
    response.status(result.status).json(result);
})

router.post('/update-block-status', Authenticate.adminAuthenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await UserController.updateBlockStatus(request);
    response.status(result.status).json(result);
})

router.get('/count-total-users', Authenticate.adminAuthenticate, async (request: Request, response: Response) => {
    const result: VirifiResult = await UserController.countTotalUsers(request);
    response.status(result.status).json(result);
})