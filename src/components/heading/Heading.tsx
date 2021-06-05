import { styled } from '@/lib/stitches.config';

export const Heading = styled('h1', {
  lineHeight: '1',
  margin: '0',
  fontWeight: 400,
  fontVariantNumeric: 'tabular-nums',
  display: 'block',
  fontFamily: '$fontDefault',

  variants: {
    type: {
      heading01: {
        fontSize: '$fontSize10',
        lineHeight: 1.2,
      },
      heading02: {
        fontSize: '$fontSize08',
        lineHeight: 1.25,
      },
      heading03: {
        fontSize: '$fontSize07',
        lineHeight: 1.25,
      },
      heading04: {
        fontSize: '$fontSize05',
        lineHeight: 1.4,
      },
      heading05: {
        fontSize: '$fontSize03',
        lineHeight: 1.375,
        fontWeight: '$fontWeightBold',
      },
    },
    size: {
      '1': { fontSize: '$fontSize01' },
      '2': { fontSize: '$fontSize02' },
      '3': { fontSize: '$fontSize03' },
      '4': { fontSize: '$fontSize04' },
      '5': { fontSize: '$fontSize05' },
      '6': { fontSize: '$fontSize06' },
      '7': { fontSize: '$fontSize07' },
      '8': { fontSize: '$fontSize08' },
      '9': { fontSize: '$fontSize09' },
      '10': { fontSize: '$fontSize10' },
      '11': { fontSize: '$fontSize11' },
      '12': { fontSize: '$fontSize12' },
      '13': { fontSize: '$fontSize13' },
      '14': { fontSize: '$fontSize14' },
      '15': { fontSize: '$fontSize15' },
      '16': { fontSize: '$fontSize16' },
      '17': { fontSize: '$fontSize17' },
      '18': { fontSize: '$fontSize18' },
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
  },
  defaultVariants: {
    size: 'normal',
    weight: 'normal',
    color: 'base',
  },
});
