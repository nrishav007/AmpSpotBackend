import { IMessage, Message } from "./message.model";
import { Types } from "mongoose";

class MessageDal {
    constructor() {}

    async createMessage(messageData: any): Promise<IMessage> {
        const message = await Message.create(messageData);
        return message;
    }

    async getUserMessageList(userId: any): Promise<IMessage[]> {

        const Id = new Types.ObjectId(userId);
        const message = await Message.aggregate([
            {
                $match: {
                    userId: Id,
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "djId",
                    foreignField: "_id",
                    as: "dj"
                }
            },
            {
                $group: {
                    "_id": "$dj",
                }
            }
        ]);
        return message;
    }

    async getDjMessageList(userId: any): Promise<IMessage[]> {

        const Id = new Types.ObjectId(userId);
        const message = await Message.aggregate([
            {
                $match: {
                    djId: Id,
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $group: {
                    "_id": "$user",
                }
            }
        ]);
        return message;
    }

    async findAllMessage(userId: string, djId: string): Promise<IMessage[]> {

        const userIdObj = new Types.ObjectId(userId);
        const djIdObj = new Types.ObjectId(djId);

        const message = await Message.find({$and: [{userId: userIdObj}, { djId: djIdObj}]});
        return message;
    }

    async updateMessageById(messageData: any): Promise<IMessage> {
        const message = await Message.findByIdAndUpdate(messageData._id, { $set: messageData }, {new: true});
        return message;
    }
}

export const Dal = new MessageDal(); 