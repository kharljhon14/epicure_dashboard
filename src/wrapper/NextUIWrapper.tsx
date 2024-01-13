'use client';

import { NextUIProvider } from '@nextui-org/react';
import type { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {}

export default function NextUIWrapper({ children }: Props) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
