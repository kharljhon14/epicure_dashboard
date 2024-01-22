'use client';

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NextUIProvider,
  useDisclosure,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { type PropsWithChildren } from 'react';
import { Flip, ToastContainer } from 'react-toastify';
import useSWR from 'swr';

import type { GetUserResponse } from '@/@types/user';
import AuthModal from '@/features/auth/AuthModal';
import Footer from '@/features/Footer';
import Header from '@/features/Header';
import fetcher from '@/utils/fetcher';

interface Props extends PropsWithChildren {}

export default function NextUIWrapper({ children }: Props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const router = useRouter();

  const { data, mutate } = useSWR<GetUserResponse>('/api/user', fetcher);

  const signOut = async () => {
    await fetch('/api/signout');
    mutate();
    router.push('/');
  };

  return (
    <NextUIProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        theme="dark"
        transition={Flip}
      />
      <div className="flex h-screen flex-col justify-between">
        <Header>
          {data?.user ? (
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  color="primary"
                  size="sm"
                >
                  👋 Hello, {data.user.name}!
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="User Actions"
                onAction={(key) => {
                  if (key === 'signout') {
                    signOut();
                  }
                  if (key === 'recipes') {
                    router.push('/user');
                  }
                }}
              >
                <DropdownItem key="recipes">📖 My Recipes</DropdownItem>
                <DropdownItem
                  key="signout"
                  className="text-danger"
                  color="danger"
                >
                  🚪 Sign Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button
              color="primary"
              onClick={onOpen}
            >
              🚀 Sign In
            </Button>
          )}
        </Header>
        <div className="mb-20 mt-16 md:mx-24 lg:mx-32">{children}</div>
        <AuthModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onClose={onClose}
        />
        <Footer />
      </div>
    </NextUIProvider>
  );
}
