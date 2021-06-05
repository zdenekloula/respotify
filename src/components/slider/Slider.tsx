import * as SliderPrimitive from '@radix-ui/react-slider';
import type { SliderProps } from '@radix-ui/react-slider';
import { styled } from '@/lib/stitches.config';

const StyledThumb = styled(SliderPrimitive.Thumb, {
  all: 'unset',
  display: 'block',
  width: 12,
  height: 12,
  backgroundColor: 'white',
  boxShadow: `0 2px 10px rgba(0, 0, 0, 0.14)`,
  borderRadius: 10,
  opacity: 0,
  transition: 'opacity 50ms',
  '&:hover': { backgroundColor: 'rgb(245, 242, 255)' },

  // keyboard
  '&:focus': {
    // boxShadow: `0 0 0 5px rgba(0, 0, 0, 0.22)`,
  },

  '&:active': {
    // opacity: 1,
  },
});

const StyledRange = styled(SliderPrimitive.Range, {
  position: 'absolute',
  backgroundColor: '$sliderRangeBackground',
  borderRadius: '9999px',
  height: '100%',
});

const StyledSlider = styled(SliderPrimitive.Root, {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none',
  touchAction: 'none',
  width: '100%',

  '&[data-orientation="horizontal"]': {
    height: 20,
  },
  '&:hover': {
    [`${StyledThumb}`]: {
      opacity: 1,
    },
    [`${StyledRange}`]: {
      background: '$primaryBase',
    },
  },

  '&[aria-disabled="true"]': {
    pointerEvents: 'none',
    opacity: 0.5,
  },
});

const StyledTrack = styled(SliderPrimitive.Track, {
  backgroundColor: '$sliderTrackBackground',
  position: 'relative',
  flexGrow: 1,
  borderRadius: '9999px',

  '&[data-orientation="horizontal"]': { height: 4 },
});

const SliderRoot = StyledSlider;
const SliderThumb = StyledThumb;
const SliderRange = StyledRange;
const SliderTrack = StyledTrack;

type Props = SliderProps;

const Slider = ({ ...props }: Props) => {
  return (
    <SliderRoot {...props}>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb />
    </SliderRoot>
  );
};

export { Slider, SliderRoot, SliderThumb, SliderRange, SliderTrack };
