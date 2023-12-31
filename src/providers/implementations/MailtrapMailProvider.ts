import Mail from "nodemailer/lib/mailer";
import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from  'nodemailer'  
export class MailtrapMailProvider implements IMailProvider {
    private transporter: Mail;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'sandbox.smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: 'e82f41f2a799c6',
                pass: '79697ce511b992'
            }
        })
    }
    async sendMail(message: IMessage): Promise<void> {
        await this.transporter.sendMail({
            to: {
                name: message.to.name,
                address: message.to.email
            },
            from: {
                name: message.to.name,
                address: message.to.email
            },
            subject: message.subject,
            html: message.body
        })

    }


}