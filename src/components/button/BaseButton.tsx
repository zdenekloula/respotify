import { styled } from '@/lib/stitches.config';

export const StyledBaseButton = styled('button', {
  position: 'relative',
  userSelect: 'none',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexShrink: 0,
  lineHeight: '1.1',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  margin: 0,
  padding: 0,
  border: 0,
  background: 'transparent',

  fontFamily: '$fontDefault',
  fontWeight: '$fontWeightBold',
  fontVariantNumeric: 'tabular-nums',

  '&:disabled': {
    opacity: 0.3,
    cursor: 'not-allowed',
  },
  '&:focus': {
    outline: 'none',
  },
});
