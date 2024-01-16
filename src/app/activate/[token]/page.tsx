'use client';

import { Card, CardBody, CardHeader } from '@nextui-org/react';
import Image from 'next/image';
import { useEffect } from 'react';

interface Props {
  params: {
    token: string;
  };
}

export default function ActivateAccountPage({ params }: Props) {
  const validateToken = async () => {
    if (params.token) {
      await fetch(`/api/activate`, {
        method: 'POST',
        body: JSON.stringify({ token: params.token }),
      });
    }
  };

  useEffect(() => {
    validateToken();
  }, [params]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
      <Card className="w-full max-w-lg rounded-md bg-white p-4 shadow-lg transition-transform duration-300 hover:scale-105">
        <CardHeader className="flex items-center justify-center">
          <div className="flex flex-col items-center gap-y-4">
            <Image
              width={94}
              height={94}
              src="/logo.jpg"
              alt="Epicure logo"
              className="rounded-full"
            />
            <h1 className="text-4xl font-extrabold text-neutral-900">
              🎉 Account Activated 🎉
            </h1>
          </div>
        </CardHeader>
        <CardBody>
          <p className="text-center text-lg text-neutral-700">
            Thank you for activating your account! You&apos;re all set to
            explore the world of Epicure. Dive in and start your culinary
            journey!
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
