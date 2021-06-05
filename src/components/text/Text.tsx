import { styled } from '@/lib/stitches.config';

export const Text = styled('p', {
  lineHeight: '1.3',
  margin: '0',
  fontWeight: 400,
  fontVariantNumeric: 'tabular-nums',
  fontFamily: '$fontDefault',

  variants: {
    size: {
      extraSmall: {
        fontSize: '$fontSize01',
      },
      small: {
        fontSize: '$fontSize02',
      },
      normal: {
        fontSize: '$fontSize03',
      },
      large: {
        fontSize: '$fontSize04',
      },
    },
    weight: {
      normal: {
        fontWeight: '$fontWeightNormal',
      },
      bold: {
        fontWeight: '$fontWeightBold',
      },
      extraBold: {
        fontWeight: '$fontWeightExtraBold',
      },
    },
    uppercase: {
      true: {
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      },
    },
    ellipsis: {
      true: {
        display: 'block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    },
    color: {
      base: {
        color: '$textBase',
      },
      subdued: {
        color: '$textSubdued',
      },
      currentColor: {
        color: 'currentColor',
      },
    },
    style: {
      italic: {
        fontStyle: 'italic',
      },
      normal: {
        fontStyle: 'normal',
      },
    },
  },
  defaultVariants: {
    size: 'normal',
    weight: 'normal',
  },
});
