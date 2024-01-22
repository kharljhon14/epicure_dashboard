'use client';

import { Card, CardBody, CardHeader, Spinner } from '@nextui-org/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import ResetPasswordForm from '@/features/auth/forgot-password/ResetPasswordForm';

interface Props {
  params: {
    token: string;
  };
}

interface ErrorType {
  error: string;
  errorMessage: string;
}

export default function ActivateAccountPage({ params }: Props) {
  const [error, setError] = useState<ErrorType>();
  const [isLoading, setIsLoading] = useState(true);
  const isInitialRender = useRef(true);

  const validateToken = async () => {
    if (params.token) {
      setIsLoading(true);
      const result = await fetch(`/api/verify-password`, {
        method: 'POST',
        body: JSON.stringify({ token: params.token }),
      });

      const body = await result.json();

      if (body.error) {
        setError(body);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    validateToken();
  }, [params]);

  return (
    <div>
      {!isLoading ? (
        <div className="flex items-center justify-center">
          {error ? (
            <Card className="w-full max-w-lg rounded-md bg-white p-4 shadow-lg ">
              <CardHeader className="flex items-center justify-center">
                <div className="flex flex-col items-center gap-y-4">
                  <Image
                    width={94}
                    height={94}
                    src="/logo.jpg"
                    alt="Epicure logo"
                    className="rounded-full"
                  />
                  <h1 className="text-center text-4xl font-extrabold capitalize text-neutral-900">
                    {error.error}
                  </h1>
                </div>
              </CardHeader>
              <CardBody>
                <p className="text-center text-lg capitalize text-neutral-700">
                  {error.errorMessage}
                </p>
              </CardBody>
            </Card>
          ) : (
            <Card className="w-full max-w-lg rounded-md bg-white p-4 shadow-lg ">
              <CardHeader className="flex items-center justify-center">
                <div className="flex flex-col items-center gap-y-4">
                  <h1 className="text-4xl font-extrabold text-neutral-900">
                    Reset Password
                  </h1>
                </div>
              </CardHeader>
              <CardBody>
                <ResetPasswordForm token={params.token} />
              </CardBody>
            </Card>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <Spinner
            label="Loading..."
            size="lg"
          />
        </div>
      )}
    </div>
  );
}
