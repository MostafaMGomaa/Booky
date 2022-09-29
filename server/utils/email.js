const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.form = `Mostafa Gomaa <${process.env.EMAIL_FROM}>`;
  }
  newTransport() {
    if (process.env.NODE_ENV === 'producation') {
      // USING SEND GRID.
      return 1;
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send actual email.
  async send(template, subject) {
    // 1) Build pug template
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      }
    );

    // 2) Define email options
    const mailOptions = {
      from: this.form,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };
    /**
     * htmlToText.fromString(html)
     */
    // 3) Create Transport and send Email.

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcom() {
    await this.send('welcom', 'Welcom to Booky store');
  }

  async sendPassowrdReset() {
    this.send(
      'passwordReset',
      'Your Password reset token (valid only for 10 minutes'
    );
  }
};
