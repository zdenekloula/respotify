import { styled } from '@/lib/stitches.config';

export const Link = styled('a', {
  variants: {
    color: {
      base: {
        color: '$textBase',
      },
      subdued: {
        color: '$textSubdued',
        '&:hover': {
          color: '$textBase',
        },
      },
      currentColor: {
        color: 'currentColor',
        '&:hover': {
          color: 'currentColor',
        },
      },
    },
  },
  defaultVariants: {
    color: 'base',
  },
});
