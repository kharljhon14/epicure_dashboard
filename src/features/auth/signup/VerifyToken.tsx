import { Button, Input } from '@nextui-org/react';

export default function VerifyTokenForm() {
  return (
    <form autoComplete="off">
      <Input
        placeholder="Enter OTP"
        maxLength={6}
      />
      <Button
        color="primary"
        className="mt-6 w-full"
        size="lg"
        type="submit"
      >
        Verify
      </Button>
    </form>
  );
}
