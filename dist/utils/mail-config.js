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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailConfig = void 0;
const mail_transporter_1 = require("./mail-transporter");
require('dotenv').config();
class MailConfigClass {
    constructor() { }
    verifyEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const subject = `DJ-Spot Verify your mail`;
            const html = `  <html>
                                    <body>
                                        <table>
                                            <tr>
                                                <th>This is sample mail to verify email on spot-dj.</th>
                                                <td>Thank you!!</td>
                                            </tr>
                                        </table>
                                    </body>
                                </html>`;
            new mail_transporter_1.MailTransporter(email, subject, html);
        });
    }
    ;
}
exports.MailConfig = new MailConfigClass();
//# sourceMappingURL=mail-config.js.map