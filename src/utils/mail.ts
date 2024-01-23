import sgMail from '@sendgrid/mail';

import { generateTemplate } from '@/templates/template';

import { MAILING_EMAIL, SENDGRID_API_KEY } from './enviromentVariables';

sgMail.setApiKey(SENDGRID_API_KEY);

interface Profile {
  name: string;
  email: string;
}

export async function sendVericifationTokenEmail(
  profile: Profile,
  url: string
) {
  const welcomeMessage = `Greetings, ${profile.name}! Welcome to Epicure. Kindly use the provided OTP to verify your email.`;

  const msg = {
    to: profile.email, // Change to your recipient
    from: MAILING_EMAIL, // Change to your verified sender
    subject: 'Welcome to Epicure!',
    text: 'Activate your account',
    html: generateTemplate({
      title: 'Welcome to Epicure!',
      message: welcomeMessage,
      link: url,
      btnTitle: 'Activate',
    }),
  };

  await sgMail.send(msg);
}

export async function sendForgotPasswordTokenEmail(
  profile: Profile,
  url: string
) {
  const welcomeMessage = `Hello, ${profile.name}! You've requested a password reset. Please click the reset button to change your password.`;

  const msg = {
    to: profile.email, // Change to your recipient
    from: MAILING_EMAIL, // Change to your verified sender
    subject: 'Forgot Password Request!',
    text: 'Forgot Password Request!',
    html: generateTemplate({
      title: 'Forgot Password Request!',
      message: welcomeMessage,
      link: url,
      btnTitle: 'Reset',
    }),
  };
  await sgMail.send(msg);
}
