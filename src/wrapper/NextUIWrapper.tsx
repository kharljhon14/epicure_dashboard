'use client';

import { NextUIProvider } from '@nextui-org/react';
import type { PropsWithChildren } from 'react';

import Header from '@/features/Header';

interface Props extends PropsWithChildren {}

export default function NextUIWrapper({ children }: Props) {
  return (
    <NextUIProvider>
      <Header />
      <div className=" my-24 md:mx-24 lg:mx-32">{children}</div>
    </NextUIProvider>
  );
}
