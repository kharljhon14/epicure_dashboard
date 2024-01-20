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
import { type PropsWithChildren } from 'react';
import useSWR, { useSWRConfig } from 'swr';

import type { GetUserResponse } from '@/@types/user';
import AuthModal from '@/features/auth/AuthModal';
import Footer from '@/features/Footer';
import Header from '@/features/Header';
import fetcher from '@/utils/fetcher';

interface Props extends PropsWithChildren {}

export default function NextUIWrapper({ children }: Props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { data } = useSWR<GetUserResponse>('/api/user', fetcher);
  const { mutate } = useSWRConfig();

  const signOut = async () => {
    await fetch('/api/signout');
    mutate('/api/user');
  };

  return (
    <NextUIProvider>
      <Header>
        {data?.user ? (
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="bordered"
                color="primary"
              >
                {data.user.name}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Static Actions"
              onAction={(key) => {
                if (key === 'signout') {
                  signOut();
                }
              }}
            >
              <DropdownItem key="profile">Profile</DropdownItem>
              <DropdownItem key="recipes">My Recipes</DropdownItem>
              <DropdownItem
                key="signout"
                className="text-danger"
                color="danger"
              >
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Button
            color="primary"
            onClick={onOpen}
          >
            Sign In
          </Button>
        )}
      </Header>
      <div className=" mb-20 mt-16 min-h-screen md:mx-24 lg:mx-32">
        {children}
      </div>
      <AuthModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
      <Footer />
    </NextUIProvider>
  );
}
