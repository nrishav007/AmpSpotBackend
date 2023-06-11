import { Request } from "express"
import { VirifiError, VirifiResult, Logger, JWT, MailConfig } from "../../utils/index";
import { Dal as AdminDal } from "./admin.dal"
import { Admin, IAdmin } from "./admin.model";
import { hash, compare } from "bcrypt";

class AdminController{
    constructor() {}

    async adminLogin(req: Request): Promise<VirifiResult> {
        
        const {email, password}: {email: string, password: string} = req.body;
        if( !email || !password){
            throw new VirifiError(401, "Missing Parameter");
        }

        const admin: IAdmin = await AdminDal.findAdminByEmail(email);
        if(!admin){
            throw new VirifiError(401, "Admin Not Exist!!")
        }

        //Password check
        const adminPassword: string = admin?.password as string;
        const passwordCheck = await compare(password, adminPassword);
        if (!passwordCheck) {
            throw new VirifiError(403, 'Invalid password.');
        }

        const token = await JWT.createToken(admin._id);
        const result = new VirifiResult(200, 'Signin Successful', { token, admin })
        return result;

    }

    async registerUser(req: Request): Promise<VirifiResult> {

        const { email, password }: { email: string, password: string } = req.body;
        // if (!email || !password) {
        //     throw new VirifiError(401, 'Missing Parameters');
        // }

        const passwordHash: string = await hash("123", 10);

        const userData: IAdmin = {
            fullName: "Admin",
            email : "admin1@gmail.com",
            password: passwordHash,
        }

        await AdminDal.createAdmin(userData);
        const result = new VirifiResult(200, 'Signin Successful')
        return result
        
    }

    async updatePassword(req: Request): Promise<VirifiResult> {
        const { currentPassword, newPassword, adminId }: { currentPassword: string, newPassword: string, adminId: string } = req.body;

        //check user in userDB
        const admin: IAdmin = await AdminDal.findAdminById(adminId);
        
        const passwordCorrect = await compare(currentPassword, admin.password as string);
        if(!passwordCorrect) {
            throw new VirifiError(401, 'Invalid Password Current password');
        }

        const newPasswordHash = await hash(newPassword, 10);

        const userData: IAdmin = {
            _id: adminId,
            password: newPasswordHash
        }

        const updateAdmin: IAdmin = await AdminDal.updateAdminById(userData);
        
        const result = new VirifiResult(200, ' Password Updated Successfull', { admin: updateAdmin });
        return result;

    }
}

export const Controller = new AdminController();
