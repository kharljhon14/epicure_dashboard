'use client';

import { Button, NextUIProvider, useDisclosure } from '@nextui-org/react';
import type { PropsWithChildren } from 'react';

import AuthModal from '@/features/auth/AuthModal';
import Header from '@/features/Header';

interface Props extends PropsWithChildren {}

export default function NextUIWrapper({ children }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <NextUIProvider>
      <Header>
        <Button
          color="primary"
          onClick={onOpen}
        >
          Sign In
        </Button>
      </Header>
      <div className=" my-24 md:mx-24 lg:mx-32">{children}</div>
      <AuthModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </NextUIProvider>
  );
}
