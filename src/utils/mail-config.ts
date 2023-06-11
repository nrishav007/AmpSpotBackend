import { MailTransporter } from './mail-transporter';
require('dotenv').config();

class MailConfigClass {
    constructor() { }

    async verifyEmail(email: string) {

        const subject: string = `DJ-Spot Verify your mail`;
        const html: string = `  <html>
                                    <body>
                                        <table>
                                            <tr>
                                                <th>This is sample mail to verify email on spot-dj.</th>
                                                <td>Thank you!!</td>
                                            </tr>
                                        </table>
                                    </body>
                                </html>`;
        new MailTransporter(email, subject, html);
    };
}

export const MailConfig = new MailConfigClass();