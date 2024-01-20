'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

import InlineAlert from '@/components/InlineAlert';
import { CreateUserSchema, type CreateUserSchemaType } from '@/schemas/user';

interface Props {
  handlIsSignUp(value: boolean): void;
}

export default function SignUpForm({ handlIsSignUp }: Props) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateUserSchemaType>({
    resolver: zodResolver(CreateUserSchema),
  });

  const onSubmit: SubmitHandler<CreateUserSchemaType> = async (data) => {
    setIsLoading(true);
    setErrorMessage('');
    const res = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify(data),
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
          {...register('name')}
          label="Name*"
          isInvalid={!!errors.name?.message}
          errorMessage={errors.name?.message && errors.name.message}
          disabled={isLoading}
        />
        <Input
          {...register('email')}
          label="Email*"
          isInvalid={!!errors.email?.message}
          errorMessage={errors.email?.message && errors.email.message}
          disabled={isLoading}
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
        <Controller
          control={control}
          name="accept"
          render={({ field: { onChange, value } }) => (
            <div className="space-y-1">
              <Checkbox
                onChange={onChange}
                isSelected={value}
                disabled={isLoading}
              >
                <span className="text-small">
                  I Agree with privacy and policy
                </span>
              </Checkbox>
              <legend className="text-tiny text-danger-500">
                {errors.accept?.message}
              </legend>
            </div>
          )}
        />
      </div>
      <div className="flex w-full flex-col items-center space-y-4">
        <Button
          color="primary"
          className="mt-6 w-full"
          size="lg"
          isLoading={isLoading}
          disabled={isLoading}
          type="submit"
        >
          Sign Up
        </Button>

        <p className="text-center text-sm text-gray-600">
          Already part of the Epicure family?
          <button
            onClick={() => handlIsSignUp(false)}
            type="button"
            className="ml-1 text-blue-500 hover:underline"
          >
            Sign in here
          </button>
        </p>
      </div>
    </form>
  );
}
