'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import Link from 'next/link';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

import type { SignInUserScehmaType } from '@/schemas/user';
import { SignInUSerSchema } from '@/schemas/user';

export default function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInUserScehmaType>({
    resolver: zodResolver(SignInUSerSchema),
  });

  const onSubmit: SubmitHandler<SignInUserScehmaType> = async (data) => {
    const res = await fetch('/api/signin', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const body = await res.json();

      console.log(body);
    } else {
      const error = await res.json();

      alert(error.error);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <Input
          {...register('email')}
          label="Email*"
          isInvalid={!!errors.email?.message}
          errorMessage={errors.email?.message && errors.email.message}
        />
        <Input
          {...register('password')}
          type={passwordVisible ? 'text' : 'password'}
          label="Password*"
          endContent={
            <button
              className="text-2xl text-neutral-500 focus:outline-none"
              type="button"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <IoMdEye /> : <IoMdEyeOff />}
            </button>
          }
          isInvalid={!!errors.password?.message}
          errorMessage={errors.password?.message && errors.password.message}
        />

        <div className="flex justify-between text-sm">
          <Link
            href="/"
            className=" hover:underline"
          >
            Forgot Password
          </Link>
          <Link
            href="/"
            className="text-blue-500 hover:underline"
          >
            Create Account
          </Link>
        </div>
      </div>
      <Button
        color="primary"
        className="mt-6 w-full"
        type="submit"
      >
        Sign In
      </Button>
    </form>
  );
}
