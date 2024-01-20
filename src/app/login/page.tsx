import { Card, CardBody, CardHeader } from '@nextui-org/react';
import Image from 'next/image';

import SignInForm from '@/features/auth/signin/SignInForm';

export default function SignInPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
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
                objectPosition: 'center',
              }}
            />
            <h1 className="text-3xl font-extrabold text-neutral-800">
              Sign In
            </h1>
          </div>
        </CardHeader>
        <CardBody>
          <SignInForm />
        </CardBody>
      </Card>
    </div>
  );
}
