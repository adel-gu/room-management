import nodemailer from 'nodemailer';
import pug from 'pug';

class Email {
  private to: string;
  private name: string;
  private url: string;
  private from: string;

  constructor(user: { name: string; email: string }, url: string) {
    this.to = user.email;
    this.name = user.name;
    this.url = url;
    this.from =
      process.env.NODE_ENV === 'production'
        ? (process.env.PROD_EMAIL_FROM as string)
        : (process.env.EMAIL_FROM as string);
  }

  private newCreateTransport() {
    if (process.env.NODE_ENV === 'production') {
      return nodemailer.createTransport({
        host: process.env.PROD_EMAIL_HOST as string,
        port: 465,
        secure: true,
        auth: {
          user: process.env.PROD_EMAIL_USERNAME,
          pass: process.env.PROD_EMAIL_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST as string,
      port: parseInt(process.env.EMAIL_PORT as string),
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  private async send(template: string, subject: string) {
    const html = pug.renderFile(`${__dirname}/../templates/${template}.pug`, {
      name: this.name,
      url: this.url,
      subject,
    });

    const mailOption = {
      from: this.from,
      to: this.to,
      subject,
      html,
    };

    await this.newCreateTransport().sendMail(mailOption);
  }

  async sendEmailVerification() {
    await this.send('verifyEmail', 'Motel.com: Account Verification');
  }

  async sendResetPassword() {
    await this.send('resetPassword', 'Motel.com: Password Reset');
  }
}

export default Email;
