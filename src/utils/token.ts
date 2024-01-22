import jwt from 'jsonwebtoken';

import {
  ACTIVATE_TOKEN_SECRET,
  FORGOT_PASSWORD_TOKEN_SECRET,
  SESSION_TOKEN_SECRET,
} from './enviromentVariables';

type Payload = {
  [key: string]: string | number;
};

export function createActivationToken(payload: Payload) {
  return jwt.sign(payload, ACTIVATE_TOKEN_SECRET, { expiresIn: '5m' });
}

export function createSessionToken(payload: Payload) {
  return jwt.sign(payload, SESSION_TOKEN_SECRET, { expiresIn: '1d' });
}

export function createForgotPasswordToken(payload: Payload) {
  return jwt.sign(payload, FORGOT_PASSWORD_TOKEN_SECRET, { expiresIn: '5m' });
}
