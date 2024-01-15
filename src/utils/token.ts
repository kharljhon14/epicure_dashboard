import jwt from 'jsonwebtoken';

import { ACTIVATE_TOKEN_SECRET } from './enviromentVariables';

type Payload = {
  [key: string]: string | number;
};

export function createActivationToken(payload: Payload) {
  return jwt.sign(payload, ACTIVATE_TOKEN_SECRET, { expiresIn: '10m' });
}
