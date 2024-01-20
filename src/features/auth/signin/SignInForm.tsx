'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import Link from 'next/link';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useSWRConfig } from 'swr';

import InlineAlert from '@/components/InlineAlert';
import type { SignInUserScehmaType } from '@/schemas/user';
import { SignInUSerSchema } from '@/schemas/user';

interface Props {
  handlIsSignUp(value: boolean): void;
  onClose(): void;
}

export default function SignInForm({ handlIsSignUp, onClose }: Props) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { mutate } = useSWRConfig();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInUserScehmaType>({
    resolver: zodResolver(SignInUSerSchema),
  });

  const onSubmit: SubmitHandler<SignInUserScehmaType> = async (data) => {
    setLoading(true);
    setErrorMessage('');
    const res = await fetch('/api/signin', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (res.ok) {
      mutate('/api/user');
      onClose();
    } else {
      const { error } = await res.json();

      setErrorMessage(error);
    }
    setLoading(false);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      {errorMessage && (
        <InlineAlert
          variant="negative"
          title="Something went wrong!"
          className="mb-6"
        >
          <p>{errorMessage}</p>
        </InlineAlert>
      )}

      <div className="space-y-4">
        <Input
          {...register('email')}
          label="Email*"
          isInvalid={!!errors.email?.message}
          errorMessage={errors.email?.message && errors.email.message}
          disabled={loading}
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
          disabled={loading}
        />

        <div className="flex justify-between text-sm">
          <Link
            href="/"
            className=" hover:underline"
          >
            Forgot Password
          </Link>
          <button
            onClick={() => handlIsSignUp(true)}
            type="button"
            className="text-blue-500 hover:underline"
          >
            Create Account
          </button>
        </div>
      </div>
      <Button
        color="primary"
        className="mt-6 w-full"
        type="submit"
        disabled={loading}
        isLoading={loading}
      >
        Submit
      </Button>
    </form>
  );
}
