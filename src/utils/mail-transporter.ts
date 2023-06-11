import nodemailer from 'nodemailer';

require('dotenv').config();

export class MailTransporter {
    [x: string]: string;

    email: string;
    subject: string;
    html: string;
    fileContent: any;
    fileName: string;

    constructor(email:string, subject:string, html:string, fileContent?: any, fileName?: any) {

        this.email = email;
        this.subject = subject;
        this.html = html;
        this.fileContent = fileContent || '';
        this.fileName = fileName;

        const sendMail: any = {
            from: `"DJ-Spot" <${process.env.MAIL_EMAIL}>`,
            to: `${this.email}`,
            subject: this.subject,
            html: this.html,
        }
        
        if(this.fileName){
            console.log('mail iffffff')
            const attachments: any = [
                {
                    filename: this.fileName,
                    content: this.fileContent,
                    contentType: 'application/pdf'
                }
            ]

            sendMail.attachments = attachments;
        }

        nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `${process.env.MAIL_EMAIL}`,
                pass: `${process.env.MAIL_PASS}`,
            },
        }).sendMail(sendMail);
    }
}
