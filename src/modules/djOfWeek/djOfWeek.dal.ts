import { IDjOfWeek, DjOfWeek } from "./djOfWeek.model";

class DjOfWeekDal {
    constructor() {}

    async createDjOfWeek(djOfWeekData: any): Promise<IDjOfWeek> {
        const djOfWeek = await DjOfWeek.create(djOfWeekData);
        return djOfWeek;
    }

    async getDjOfWeek(): Promise<IDjOfWeek> {

        const djOfWeek = await DjOfWeek.findOne().populate("djId");
        return djOfWeek;
    }
}

export const Dal = new DjOfWeekDal(); 