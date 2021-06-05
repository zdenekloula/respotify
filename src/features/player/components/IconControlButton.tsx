import type { PropsWithChildren } from 'react';
import React from 'react';
import { IconButton } from '@/components/button/IconButton';
import { styled } from '@/lib/stitches.config';

export const StyledIconControlButton = styled(IconButton, {
  variants: {
    showActiveDot: {
      true: {
        '&:before': {
          backgroundColor: 'currentColor',
          borderRadius: '$full',
          content: '',
          display: 'none',
          position: 'absolute',
          height: '4px',
          width: '4px',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
        },
      },
    },
  },
});

export type IconControlButtonProps = React.ComponentProps<typeof StyledIconControlButton> & {
  isActive?: boolean;
  href?: string;
};

export const IconControlButton = React.forwardRef(
  (
    { children, isActive, href, css, ...otherProps }: PropsWithChildren<IconControlButtonProps>,
    reference: React.ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <StyledIconControlButton
        href={href}
        css={{
          ...(isActive
            ? {
                ...css,

                color: '$primaryBase',
                '&:hover:enabled': {
                  color: '$primaryHighlight',
                },
                '&:active:enabled': {
                  color: '$primaryPress',
                },
                '&:before': {
                  display: 'block',
                },
              }
            : {
                ...css,
              }),
        }}
        ref={reference}
        {...otherProps}
      >
        {children}
      </StyledIconControlButton>
    );
  }
);

IconControlButton.displayName = 'IconControlButton';
