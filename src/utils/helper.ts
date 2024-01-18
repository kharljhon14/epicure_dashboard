/* eslint-disable no-plusplus */
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function generateToken(length: number = 6) {
  let otp = '';

  for (let i = 0; i < length; i++) {
    const digit = Math.floor(Math.random() * 10);

    otp += digit;
  }

  return otp;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
