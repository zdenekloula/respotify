import { HeaderTextColorVariants } from './HeaderText';
import { styled } from '@/lib/stitches.config';

export const DotSeparator = styled('span', {
  '&:before': {
    content: '•',
    marginInline: '4px',
    fontSize: '10px',
    color: 'currentColor',
  },
  variants: {
    color: {
      base: {
        color: HeaderTextColorVariants.base,
      },
      subdued: {
        color: HeaderTextColorVariants.subdued,
      },
      currentColor: {
        color: 'currentColor',
      },
    },
  },
});
