import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import type { PropsWithChildren } from 'react';
import { styled } from '@/lib/stitches.config';

const SCROLLBAR_SIZE = 12;

const StyledScrollAreaRoot = styled(ScrollAreaPrimitive.Root, {
  overflow: 'hidden',
});

const StyledViewport = styled(ScrollAreaPrimitive.Viewport, {
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
  variants: {
    forceVerticalOnly: {
      true: {
        // https://github.com/radix-ui/primitives/issues/926
        '> div[style]': {
          minHeight: '100%',
          display: 'flex !important',
          flexDirection: 'column',
        },
      },
    },
  },
});

const StyledScrollbar = styled(ScrollAreaPrimitive.Scrollbar, {
  display: 'flex',
  // ensures no selection
  userSelect: 'none',
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: 'none',
  transition: 'background 160ms ease-out',
  // '&:hover': { background: '#878787' },
  '&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE },
  '&[data-orientation="horizontal"]': {
    flexDirection: 'column',
    height: SCROLLBAR_SIZE,
  },
});

const StyledThumb = styled(ScrollAreaPrimitive.Thumb, {
  flex: 1,
  background: '$scrollbarThumbBackground',
  // borderRadius: SCROLLBAR_SIZE,
  // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    minWidth: 44,
    minHeight: 44,
  },
  '&:hover': { background: '$scrollbarThumbBackgroundHover' },
  '&:active': { background: '$scrollbarThumbBackgroundActive' },
});

const StyledCorner = styled(ScrollAreaPrimitive.Corner, {
  background: '#878787',
});

const ScrollAreaRoot = StyledScrollAreaRoot;
const ScrollAreaViewport = StyledViewport;
const ScrollAreaScrollbar = StyledScrollbar;
const ScrollAreaThumb = StyledThumb;
const ScrollAreaCorner = StyledCorner;

type ScrollAreaProps = {
  forceVerticalOnly?: boolean;
} & ScrollAreaPrimitive.ScrollAreaProps;

const ScrollArea = ({
  id,
  children,
  dir,
  type,
  scrollHideDelay,
  forceVerticalOnly,
}: PropsWithChildren<ScrollAreaProps>) => {
  return (
    <ScrollAreaRoot dir={dir} type={type} scrollHideDelay={scrollHideDelay}>
      <ScrollAreaViewport id={id} forceVerticalOnly={forceVerticalOnly}>
        {children}
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation="horizontal">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaScrollbar orientation="vertical">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollAreaRoot>
  );
};

export {
  ScrollArea,
  ScrollAreaRoot,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
};
