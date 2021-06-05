import NextLink from 'next/link';
import React from 'react';
import { IconContainer } from '../icon';
import { StyledBaseButton } from './BaseButton';
import { styled } from '@/lib/stitches.config';

export const StyledButton = styled(StyledBaseButton, {
  cursor: 'default',

  '&:disabled': {
    opacity: 0.3,
    cursor: 'not-allowed',
  },
  textTransform: 'uppercase',
  letterSpacing: '1.76px',

  '&:hover': {
    transform: 'scale(1.04)',
  },
  '&:active': {
    transform: 'scale(1)',
  },
  // '&:focus': {
  //   outline: 'none',
  // },

  variants: {
    size: {
      small: {
        fontSize: '$fontSize01',
        letterSpacing: '0.1em',
        lineHeight: '$space$spacing05',
        // Match the spotify sizing
        padding: 'calc($spacing03 - 1px) calc($spacing05 - 1px)',
      },
      medium: {
        fontSize: '$fontSize01',
        letterSpacing: '0.145em',
        lineHeight: '$space$spacing05',
        // Match the spotify sizing
        padding: 'calc($spacing04 - 1px) $spacing07',
      },
      large: {},
      none: {},
    },
    variant: {
      primary: {
        backgroundColor: '$buttonPrimaryBackgroundBase',
        color: '$buttonPrimaryColorBase',
        '&:hover:enabled': {
          backgroundColor: '$buttonPrimaryBackgroundHighlight',
        },
        '&:active:enabled': {
          backgroundColor: '$buttonPrimaryBackgroundPress',
        },
      },
      secondary: {
        backgroundColor: '$buttonSecondaryBackgroundBase',
        color: '$buttonSecondaryColorBase',
        '&:hover:enabled': {
          backgroundColor: '$buttonSecondaryBackgroundHighlight',
        },
        '&:active:enabled': {
          backgroundColor: '$buttonSecondaryBackgroundPress',
        },
      },
      tertiary: {
        backgroundColor: 'transparent',
        color: '$buttonTertiaryColorBase',
        border: '1px solid $buttonTertiaryBorderColorBase',
        '&:hover:enabled': {
          border: '1px solid $buttonTertiaryBorderColorHighlight',
        },
      },
      tertiarySubtle: {
        backgroundColor: 'transparent',
        color: '$buttonTertiarySubtleColorBase',
        '&:hover:enabled': {
          color: '$buttonTertiarySubtleColorHighlight',
          // color: '$buttonTertiaryColorBase',
        },
        '&:active:enabled': {
          color: '$buttonTertiarySubtleColorBase',
        },
      },
    },
    disableTransform: {
      true: {
        transform: 'none',
        '&:hover': {
          transform: 'none',
        },
      },
    },
    radius: {
      base: {
        borderRadius: '$base',
      },
      rounded: {
        borderRadius: '$full',
      },
    },
    iconOnly: {
      true: {
        padding: '0',
      },
    },
  },
  compoundVariants: [
    {
      size: 'none',
      iconOnly: true,
      css: {
        width: '16px',
        height: '16px',
        [`${IconContainer}`]: {
          width: '16px',
          height: '16px',
        },
      },
    },
    {
      size: 'small',
      iconOnly: true,
      css: {
        width: '24px',
        height: '24px',
        [`${IconContainer}`]: {
          width: '16px',
          height: '16px',
        },
      },
    },
    {
      size: 'medium',
      iconOnly: true,
      css: {
        width: '32px',
        height: '32px',
        [`${IconContainer}`]: {
          width: '16px',
          height: '16px',
        },
      },
    },
    {
      size: 'large',
      iconOnly: true,
      css: {
        width: '48px',
        height: '48px',
        [`${IconContainer}`]: {
          width: '32px',
          height: '32px',
        },
      },
    },
  ],
  defaultVariants: {
    size: 'medium',
    variant: 'primary',
    radius: 'rounded',
  },
});

export type ButtonProps = React.ComponentProps<typeof StyledButton> & {
  as?: keyof JSX.IntrinsicElements;
  loading?: boolean;
  href?: string;
};

const Button: React.FC<ButtonProps> = React.forwardRef(
  ({ children, href, size, disabled, onClick, ...remainingProps }: ButtonProps, reference) => {
    if (href) {
      return (
        <NextLink href={href} passHref>
          <StyledButton as="a" size={size} ref={reference} {...remainingProps}>
            {children}
          </StyledButton>
        </NextLink>
      );
    }
    return (
      <StyledButton
        onClick={disabled ? undefined : onClick}
        size={size}
        ref={reference}
        disabled={disabled}
        {...remainingProps}
      >
        {children}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';

export { Button };
