import { Button, Input } from '@nextui-org/react';
import Link from 'next/link';

export default function LoginForm() {
  return (
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
  );
}
