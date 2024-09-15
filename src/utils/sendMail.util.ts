import nodemailer from 'nodemailer'
import env from '../env'
import { mailOptionType } from '../common/types/mailer.type';
import { Transporter } from 'nodemailer';
const Email = env.ENV_EMAIL.EMAIL || "your-email"
const Password = env.ENV_EMAIL.PASSWORD || "your-password"
export function sendMail(toEmail: string, subject: string, title: string , text : string, link:string) : Promise<void> {
const transporter: Transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: Email,
    pass:  Password,
  }
});

const mailOptions: mailOptionType = {
  from: Email,
  to: toEmail,
  subject: subject,
  html: 
  `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-9" />
    <meta name="viewport" content="width=device-width, initial-scale=0.0" />
    <title>${subject}</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f3f4f4;
        padding: 19px;
        text-align: center;
      }
      .button {
        background-color: #006bff;
        color: white;
        padding: 14px 25px;
        text-decoration: none;
        font-size: 15px;
        border-radius: 4px;
        display: inline-block;
        margin-top: 19px;
      }
      .button:hover {
        background-color: #0055b3;
      }
    </style>
  </head>
  <body>
    <h1>${title}</h2>
    <p>${text}</p>
    <h2>${link}</h2>
    <a href="${link}" class="button">${subject}</a>
  </body>
</html>
`
};
  return transporter.sendMail(mailOptions);
}
