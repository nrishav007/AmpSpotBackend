"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailTransporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
require('dotenv').config();
class MailTransporter {
    constructor(email, subject, html, fileContent, fileName) {
        this.email = email;
        this.subject = subject;
        this.html = html;
        this.fileContent = fileContent || '';
        this.fileName = fileName;
        const sendMail = {
            from: `"DJ-Spot" <${process.env.MAIL_EMAIL}>`,
            to: `${this.email}`,
            subject: this.subject,
            html: this.html,
        };
        if (this.fileName) {
            console.log('mail iffffff');
            const attachments = [
                {
                    filename: this.fileName,
                    content: this.fileContent,
                    contentType: 'application/pdf'
                }
            ];
            sendMail.attachments = attachments;
        }
        nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: `${process.env.MAIL_EMAIL}`,
                pass: `${process.env.MAIL_PASS}`,
            },
        }).sendMail(sendMail);
    }
}
exports.MailTransporter = MailTransporter;
//# sourceMappingURL=mail-transporter.js.map