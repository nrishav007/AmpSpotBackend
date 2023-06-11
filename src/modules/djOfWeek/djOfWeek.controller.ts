import { Request } from "express";
import { VirifiError, VirifiResult, Logger, JWT, MailConfig } from "../../utils/index";
import { IDjOfWeek } from "./djOfWeek.model";
import { Dal as DjOfWeekDal } from "./djOfWeek.dal";
import moment from "moment";

interface Upload extends Request {
    files?: any
}

class DjOfWeekController {
    constructor() { }

    async createDjOfWeek(req: Upload): Promise<VirifiResult> {
        
        const { addDuration, cost, location, review, doc }: { addDuration: string, cost: number, location: string, review: string, doc: any } = req.body;

        let profileImage: string = "";
        if(req.files){

            profileImage = moment() + req.files.doc.name;
            await req.files.doc.mv('./public/djOfWeek/'+profileImage);
        }

        const DjOfWeekData: IDjOfWeek = {
            djId: req.user._id,
            addDuration,
            cost,
            location,
            review,
            image: profileImage
        }

        const djOfWeek : IDjOfWeek = await DjOfWeekDal.createDjOfWeek(DjOfWeekData);

        const result = new VirifiResult(200, 'ADj Of Week Requested Submitted', {djOfWeek});
        return result;
    }

    async djOfWeek(req: Request): Promise<VirifiResult> {
        
        const djOfWeek : IDjOfWeek = await DjOfWeekDal.getDjOfWeek();

        const result = new VirifiResult(200, 'DJ of the week', {djOfWeek});
        return result;
    }
}

export const Controller = new DjOfWeekController();