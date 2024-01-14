'use client';

import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

export default function SignUpForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <form action="">
      <div className="space-y-4">
        <Input placeholder="epicure@mail.com" />
        <Input
          type={passwordVisible ? 'text' : 'password'}
          placeholder="Password"
          endContent={
            <button
              className="text-2xl text-neutral-500 focus:outline-none"
              type="button"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <IoMdEye /> : <IoMdEyeOff />}
            </button>
          }
        />
        <Input
          type={confirmPasswordVisible ? 'text' : 'password'}
          placeholder="Confirm Password"
          endContent={
            <button
              className="text-2xl text-neutral-500 focus:outline-none"
              type="button"
              onClick={toggleConfirmPasswordVisibility}
            >
              {confirmPasswordVisible ? <IoMdEye /> : <IoMdEyeOff />}
            </button>
          }
        />
      </div>
      <Button
        color="primary"
        className="mt-6 w-full"
        size="lg"
      >
        Sign Up
      </Button>
    </form>
  );
}
