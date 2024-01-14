import { Card, CardBody, CardHeader } from '@nextui-org/react';
import Image from 'next/image';

import SignUpForm from '@/features/auth/signup/SignUpForm';

export default function Home() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="w-full max-w-lg p-4">
        <CardHeader className="flex items-center justify-center">
          <div className="flex flex-col items-center gap-y-4">
            <Image
              width={94}
              height={94}
              src="/logo.jpg"
              alt="Epicure logo"
              style={{
                height: 'auto',
                width: 'auto',
                objectFit: 'cover',
                borderRadius: '100%',
              }}
            />
            <h1 className="text-3xl font-extrabold text-neutral-800">
              Sign Up
            </h1>
          </div>
        </CardHeader>
        <CardBody>
          <SignUpForm />
        </CardBody>
      </Card>
    </div>
  );
}
