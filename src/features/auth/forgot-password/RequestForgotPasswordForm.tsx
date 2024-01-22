'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import InlineAlert from '@/components/InlineAlert';
import type { ForgotPasswordRequestScehmaType } from '@/schemas/user';
import { ForgotPasswordRequestSchema } from '@/schemas/user';

interface Props {
  handleAuthState(value: 'signin' | 'signup' | 'forgot-password'): void;
  onClose(): void;
}

export default function RequestForgotPasswordForm({ handleAuthState }: Props) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordRequestScehmaType>({
    resolver: zodResolver(ForgotPasswordRequestSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordRequestScehmaType> = async (
    data
  ) => {
    setLoading(true);
    setErrorMessage('');
    const res = await fetch('/api/forgot-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (res.ok) {
      handleAuthState('signin');
    } else {
      const { error } = await res.json();

      setErrorMessage(error);
    }
    setLoading(false);
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

        <div className="flex justify-between text-sm">
          <p className="text-center text-sm text-gray-600">
            Already part of the Epicure family?
            <button
              onClick={() => handleAuthState('signin')}
              type="button"
              className="ml-1 text-blue-500 hover:underline"
            >
              Sign in here
            </button>
          </p>

          <button
            onClick={() => handleAuthState('signup')}
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
