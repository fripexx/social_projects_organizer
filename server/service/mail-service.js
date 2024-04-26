const nodemailer = require("nodemailer")

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            },
            // connectionTimeout: 30000
        })
    }
    async sendActivationMail(email, link) {
        await  this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: [email],
            subject: "Активація аккаунта на " + process.env.API_URL,
            text: "",
            html:
                `
                    <div>
                        <h1>Social Project Organizer</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `,
        })
    }
    async sendAdminRoleInvitation(email, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: [email],
            subject: "Активація аккаунта на " + process.env.API_URL,
            text: "",
            html:
                `
                    <div>
                        <h1>Social Project Organizer</h1>
                        <p>Вам запропонували стати новим адміністратором проєкту</p>
                        <p>Підтвердіть перейшовши за посиланням або видаліть лист якщо не бажаєте цього</p>
                        <a href="${link}">${link}</a>
                    </div>
                `,
        })
    }
}

module.exports = new MailService()