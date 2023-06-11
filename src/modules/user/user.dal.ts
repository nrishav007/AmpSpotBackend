import {User, IUser} from "./user.model";
import { WaitList, IWaitList } from "./waitList.model"
import { Types } from "mongoose";

class UserDal {
    constructor() {}

    async findUserByEmail(email?: string): Promise<IUser> {
        const user = await User.findOne({email});
        return user;
    }
    async findUserById(userId: string): Promise<IUser> {
        console.log(userId)
        const Id = new Types.ObjectId(userId);
        const user = await User.findById(Id);
        return user;
    }
    async createUser(userData: any): Promise<IUser> {
        const user = await User.create(userData);
        return user;
    }
    async createWaitList(waitListData: any): Promise<IWaitList> {
        const waitList = await WaitList.create(waitListData);
        return waitList;
    }
    async updateUserById(userData: any): Promise<IUser> {
        const user = await User.findByIdAndUpdate(userData._id, { $set: userData }, {new: true});
        return user;
    }

    async findDJUser(): Promise<IUser[]> {
        const user = await User.find({userType: "dj"});
        return user;
    }

    async findUsers(): Promise<IUser[]> {
        const user = await User.find({userType: "user"});
        return user;
    }

    async djFilter(filter: any): Promise<IUser[]> {
        const user = await User.find({$and : filter});
        return user;
    }

    async countTotalDJAndUser(): Promise<any> {
        const user = await User.aggregate([
            {
                $facet: {
                    "TotalUser": [
                        { $match: { userType: "user"}},
                        { $count: "TotalUser"},
                    ],
                    "TotalDj": [
                        { $match: { userType: "dj"}},
                        { $count: "TotalDj"},
                    ]
                }
            },
            {
                $project: {
                    "TotalUser": { $arrayElemAt: ["$TotalUser.TotalUser", 0]},
                    "TotalDj": {$arrayElemAt: ["$TotalDj.TotalDj", 0]}
                }
            }
        ]);
        return user;
    }
}

export const Dal = new UserDal(); 