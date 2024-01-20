import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {}

export default function Header({ children }: Props) {
  return (
    <Navbar
      isBordered
      className=" py-2 shadow-sm"
      shouldHideOnScroll
    >
      <NavbarBrand>
        <Link
          className="flex items-center space-x-2"
          href="/"
        >
          <Image
            width={28}
            height={28}
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
          <p className="text-lg font-semibold">Epicure</p>
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>{children}</NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
