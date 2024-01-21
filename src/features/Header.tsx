import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { type PropsWithChildren } from 'react';
import { IoSearchOutline } from 'react-icons/io5';

import RecipeSearch from './recipes/RecipeSearch';

interface Props extends PropsWithChildren {}

export default function Header({ children }: Props) {
  return (
    <Navbar
      isBordered
      className="shadow-sm"
      isBlurred={false}
    >
      <NavbarContent>
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
      </NavbarContent>

      <NavbarItem className="hidden md:flex">
        <RecipeSearch />
      </NavbarItem>

      <NavbarContent justify="end">
        <NavbarItem className="md:hidden">
          <Popover
            placement="bottom"
            shouldCloseOnBlur
          >
            <PopoverTrigger>
              <Button
                isIconOnly
                color="primary"
                variant="flat"
              >
                <IoSearchOutline size={16} />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <RecipeSearch />
            </PopoverContent>
          </Popover>
        </NavbarItem>
        <NavbarItem>{children}</NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
