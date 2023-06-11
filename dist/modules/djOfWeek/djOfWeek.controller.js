"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const index_1 = require("../../utils/index");
const djOfWeek_dal_1 = require("./djOfWeek.dal");
const moment_1 = __importDefault(require("moment"));
class DjOfWeekController {
    constructor() { }
    createDjOfWeek(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { addDuration, cost, location, review, doc } = req.body;
            let profileImage = "";
            if (req.files) {
                profileImage = (0, moment_1.default)() + req.files.doc.name;
                yield req.files.doc.mv('./public/djOfWeek/' + profileImage);
            }
            const DjOfWeekData = {
                djId: req.user._id,
                addDuration,
                cost,
                location,
                review,
                image: profileImage
            };
            const djOfWeek = yield djOfWeek_dal_1.Dal.createDjOfWeek(DjOfWeekData);
            const result = new index_1.VirifiResult(200, 'ADj Of Week Requested Submitted', { djOfWeek });
            return result;
        });
    }
    djOfWeek(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const djOfWeek = yield djOfWeek_dal_1.Dal.getDjOfWeek();
            const result = new index_1.VirifiResult(200, 'DJ of the week', { djOfWeek });
            return result;
        });
    }
}
exports.Controller = new DjOfWeekController();
//# sourceMappingURL=djOfWeek.controller.js.map