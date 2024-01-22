'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

import InlineAlert from '@/components/InlineAlert';
import type { ResetPasswordRequestSchemaType } from '@/schemas/user';
import { ResetPasswordRequestSchema } from '@/schemas/user';

interface Props {
  token: string;
}

export default function ResetPasswordForm({ token }: Props) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<ResetPasswordRequestSchemaType>({
    resolver: zodResolver(ResetPasswordRequestSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordRequestSchemaType> = async (
    data
  ) => {
    setIsLoading(true);
    setErrorMessage('');
    const res = await fetch('/api/forgot-password', {
      method: 'PATCH',
      body: JSON.stringify({ ...data, token }),
    });

    if (res.ok) {
      router.push('/');
    } else {
      const { error } = await res.json();

      setErrorMessage(error);
    }
    setIsLoading(false);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
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
          disabled={isLoading}
        />

        <Input
          {...register('confirm_password')}
          type={confirmPasswordVisible ? 'text' : 'password'}
          label="Confirm Password*"
          endContent={
            <button
              className="text-2xl text-neutral-500 focus:outline-none"
              type="button"
              onClick={toggleConfirmPasswordVisibility}
            >
              {confirmPasswordVisible ? <IoMdEye /> : <IoMdEyeOff />}
            </button>
          }
          isInvalid={!!errors.confirm_password?.message}
          errorMessage={
            errors.confirm_password?.message && errors.confirm_password.message
          }
          disabled={isLoading}
        />
      </div>

      <Button
        color="primary"
        className="mt-6 w-full"
        size="lg"
        isLoading={isLoading}
        disabled={isLoading}
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
}
