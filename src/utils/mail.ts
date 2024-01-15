import nodemailer from 'nodemailer';

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
  token: string,
  profile: Profile
) {
  const transport = generateEmailTransporter();

  const welcomeMessage = `Greetings, ${profile.name}! Welcome to Epicure. Kindly use the provided OTP to verify your email.`;

  transport.sendMail({
    to: profile.email,
    from: VERIFICATION_EMAIL,
    subject: 'Welcome to Epicure!',
    html: `<h1>${welcomeMessage}</h1>
            <span>${token}</span>`,
  });
}
