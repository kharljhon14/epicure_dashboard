import nodemailer from 'nodemailer';
import path from 'path';

import { generateTemplate } from '@/templates/template';

import {
  MAILTRAP_PASSWORD,
  MAILTRAP_USER,
  VERIFICATION_EMAIL,
} from './enviromentVariables';

export function generateEmailTransporter() {
  return nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: MAILTRAP_USER,
      pass: MAILTRAP_PASSWORD,
    },
  });
}

interface Profile {
  name: string;
  email: string;
}

export async function sendVericifationTokenEmail(
  profile: Profile,
  token: string
) {
  const transport = generateEmailTransporter();

  const welcomeMessage = `Greetings, ${profile.name}! Welcome to Epicure. Kindly use the provided OTP to verify your email.`;

  transport.sendMail({
    to: profile.email,
    from: VERIFICATION_EMAIL,
    subject: 'Welcome to Epicure!',
    html: generateTemplate({
      title: 'Welcome to Epicure!',
      message: welcomeMessage,
      logo: 'cid:logo',
      link: '',
      btnTitle: token,
    }),
    attachments: [
      {
        filename: 'logo.jpg',
        path: path.join(__dirname, '../../../../../public/logo.jpg'),
        cid: 'logo',
      },
    ],
  });
}
