import {Admin, IAdmin} from "./admin.model";
import { Types } from "mongoose";

class AdminDal {
    constructor() {}

    async findAdminByEmail(email?: string): Promise<IAdmin> {
        const user = await Admin.findOne({email});
        return user;
    }
    async createAdmin(adminData: any): Promise<IAdmin> {
        const user = await Admin.create(adminData);
        return user;
    }
    async findAdminById(adminId: string): Promise<IAdmin> {
        const Id = new Types.ObjectId(adminId);
        const admin = await Admin.findById(Id);
        return admin;
    }
    async updateAdminById(adminData: any): Promise<IAdmin> {
        const admin = await Admin.findByIdAndUpdate(adminData._id, { $set: adminData }, {new: true});
        return admin;
    }
}

export const Dal = new AdminDal(); 