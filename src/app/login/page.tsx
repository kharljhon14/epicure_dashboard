import { Card, CardBody, CardHeader } from '@nextui-org/react';

import LoginForm from '@/features/auth/login/LoginForm';

export default function SignInPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="w-full max-w-xl p-4">
        <CardHeader>
          <h1 className="text-2xl font-semibold">Login your Account</h1>
        </CardHeader>
        <CardBody>
          <LoginForm />
        </CardBody>
      </Card>
    </div>
  );
}
