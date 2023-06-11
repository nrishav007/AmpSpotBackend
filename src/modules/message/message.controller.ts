import { Request } from "express";
import { VirifiError, VirifiResult, Logger, JWT, MailConfig } from "../../utils/index";
import { IMessage } from "./message.model";
import { Dal as MessageDal } from "./message.dal";

class MessageClass {
    constructor() { }

    async createMessage(req: Request): Promise<VirifiResult> {

        const { userId, djId, message, userType }: { userId: string, djId: string, message: string, userType: string } = req.body;
        
        const messageDataCreate: IMessage = {
            userId,
            djId,
            message,
            userType
        }
        const messageData: IMessage = await MessageDal.createMessage(messageDataCreate);
        const result = new VirifiResult(200, 'Message Created', {messageData});
        return result;
    }

    async getUserMessageList(req: Request): Promise<VirifiResult> {

        const messageList: IMessage[] = await MessageDal.getUserMessageList(req.params.id);
        const result = new VirifiResult(200, 'Get User Message List', { messageList });
        return result;
    }

    async getDjMessageList(req: Request): Promise<VirifiResult> {

        const messageList: IMessage[] = await MessageDal.getDjMessageList(req.params.id);
        const result = new VirifiResult(200, 'Get Dj Message Lsit', { messageList });
        return result;
    }

    async allMessage(req: Request): Promise<VirifiResult> {

        const { userId, djId }: { userId: string, djId: string } = req.body;

        const messages: IMessage[] = await MessageDal.findAllMessage(userId, djId);
        const result = new VirifiResult(200, 'User Dj Messages', { messages });
        return result;
    }

    async updateMessage(req: Request): Promise<VirifiResult> {

        const { messageId, reaction }: { messageId: string, reaction: boolean } = req.body;

        const messageDataCreate: IMessage = {
            _id: messageId,
            reaction
        } 

        const messageData: IMessage = await MessageDal.updateMessageById(messageDataCreate);
        const result = new VirifiResult(200, 'Reaction Updated', { messageData });
        return result;
    }
}

export const Controller = new MessageClass();