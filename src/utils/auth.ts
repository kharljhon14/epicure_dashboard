import type { JwtPayload } from 'jsonwebtoken';
import { verify } from 'jsonwebtoken';
import { isValidObjectId } from 'mongoose';

import User from '@/models/user';

import { SESSION_TOKEN_SECRET } from './enviromentVariables';

export async function authenticated(token: string) {
  try {
    const payload = verify(token, SESSION_TOKEN_SECRET) as JwtPayload;

    const { id } = payload;

    if (!isValidObjectId(id)) return null;

    const user = await User.findById(id);

    if (!user) return null;

    return user;
  } catch (_err) {
    return null;
  }
}
