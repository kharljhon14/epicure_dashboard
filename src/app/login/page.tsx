import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="w-full max-w-2xl p-4">
        <CardHeader>
          <h1 className="text-2xl font-semibold">Login your account</h1>
        </CardHeader>
        <CardBody>
          <form action="">
            <div className="space-y-4">
              <Input placeholder="Username" />
              <Input
                type="password"
                placeholder="Password"
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
            >
              Log In
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
