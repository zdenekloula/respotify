import type { PropsWithChildren } from 'react';
import React from 'react';
import { Button } from '@/components/button/Button';

export type IconButtonProps = React.ComponentProps<typeof Button>;

export const IconButton = React.forwardRef(
  (
    {
      variant = 'tertiarySubtle',
      disableTransform = true,
      size = 'medium',
      href,
      children,
      ...remainingProps
    }: PropsWithChildren<IconButtonProps>,
    reference: React.ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <Button
        {...remainingProps}
        href={href}
        size={size}
        variant={variant}
        disableTransform={disableTransform}
        ref={reference}
        iconOnly
      >
        {children}
      </Button>
    );
  }
);

IconButton.displayName = 'IconButton';
