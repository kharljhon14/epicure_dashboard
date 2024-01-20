'use client';

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  NextUIProvider,
  useDisclosure,
} from '@nextui-org/react';
import Image from 'next/image';
import type { PropsWithChildren } from 'react';

import SignInForm from '@/features/auth/signin/SignInForm';
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
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
      >
        <ModalContent className="py-4">
          <ModalHeader className="flex flex-col items-center justify-center space-y-2">
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
            <span className="text-3xl font-semibold text-neutral-800">
              Sign In
            </span>
          </ModalHeader>
          <ModalBody>
            <SignInForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </NextUIProvider>
  );
}
