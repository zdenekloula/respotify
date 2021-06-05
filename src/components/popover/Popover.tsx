import * as PopoverPrimitive from '@radix-ui/react-popover';
import { styled, keyframes } from '@/lib/stitches.config';

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(10px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-10px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-10px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(10px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const StyledContent = styled(PopoverPrimitive.Content, {
  borderRadius: 5,
  width: 280,
  backgroundColor: '$gray5',
  boxShadow: '0 4px 12px 4px rgba(0, 0, 0, 0.5)',
  maxHeight: 'calc(100vh - 100px)',

  variants: {
    disableTransition: {
      true: {
        animationDuration: '1ms',
      },
    },
  },

  '@media (prefers-reduced-motion: no-preference)': {
    animationDuration: '333ms',
    animationTimingFunction: 'cubic-bezier(0.3, 0, 0, 1)',
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideUpAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideDownAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
});

const StyledArrow = styled(PopoverPrimitive.Arrow, {
  fill: '$gray5',
});

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverAnchor = PopoverPrimitive.Anchor;
export const PopoverContent = StyledContent;
export const PopoverArrow = StyledArrow;
