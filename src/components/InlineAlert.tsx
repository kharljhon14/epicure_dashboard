import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { PropsWithChildren } from 'react';

import { cn } from '@/utils/helper';

const InlineAlertVariants = cva('space-y-4 rounded-lg border-2 p-6', {
  variants: {
    variant: {
      default: 'border-neutral-400 bg-neutral-100',
      primary: 'border-blue-400 bg-blue-100',
      positive: 'border-green-400 bg-green-100',
      notice: 'border-orange-400 bg-orange-100',
      negative: 'border-red-400 bg-red-100',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface Props
  extends PropsWithChildren,
    VariantProps<typeof InlineAlertVariants> {
  className?: string;
  title?: string;
}

export default function InlineAlert({
  children,
  title,
  className,
  variant,
}: Props) {
  return (
    <div className={cn(InlineAlertVariants({ variant, className }))}>
      <h1 className="text-sm font-semibold">{title}</h1>
      <div className="text-sm text-neutral-600">{children}</div>
    </div>
  );
}
