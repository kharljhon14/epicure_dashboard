/* eslint-disable no-console */
import nodemailer from 'nodemailer';
import path from 'path';

import { generateTemplate } from '@/templates/template';

import {
  MAILING_EMAIL,
  MAILING_PASSWORD,
  VERIFICATION_EMAIL,
} from './enviromentVariables';

export function generateEmailTransporter() {
  return nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: MAILING_EMAIL,
      pass: MAILING_PASSWORD,
    },
  });
}

interface Profile {
  name: string;
  email: string;
}

export async function sendVericifationTokenEmail(
  profile: Profile,
  url: string
) {
  const transport = generateEmailTransporter();

  await new Promise((resolve, reject) => {
    // verify connection configuration
    transport.verify((error, success) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log('Server is ready to take our messages');
        resolve(success);
      }
    });
  });

  const welcomeMessage = `Greetings, ${profile.name}! Welcome to Epicure. Kindly use the provided OTP to verify your email.`;

  await new Promise((resolve, reject) => {
    transport.sendMail(
      {
        to: profile.email,
        from: VERIFICATION_EMAIL,
        subject: 'Welcome to Epicure!',
        html: generateTemplate({
          title: 'Welcome to Epicure!',
          message: welcomeMessage,
          logo: 'cid:logo',
          link: url,
          btnTitle: 'Activate',
        }),
        attachments: [
          {
            filename: 'logo.jpg',
            path: path.join(__dirname, '../../../../../public/logo.jpg'),
            cid: 'logo',
          },
        ],
      },
      (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log(info);
          resolve(info);
        }
      }
    );
  });
}

export async function sendForgotPasswordTokenEmail(
  profile: Profile,
  url: string
) {
  const transport = generateEmailTransporter();

  const welcomeMessage = `Hello, ${profile.name}! You've requested a password reset. Please click the reset button to change your password.`;

  await transport.sendMail({
    to: profile.email,
    from: VERIFICATION_EMAIL,
    subject: 'Forgot Password Request!',
    html: generateTemplate({
      title: 'Forgot Password Request!',
      message: welcomeMessage,
      logo: 'cid:logo',
      link: url,
      btnTitle: 'Reset',
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
