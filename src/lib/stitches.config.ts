import { createStitches } from '@stitches/react';
import { media } from '@/theme/media';

const { styled, css, globalCss, keyframes, getCssText, createTheme, config, theme } =
  createStitches({
    media,
    utils: {},
  });

export { styled, css, globalCss, keyframes, getCssText, createTheme, config, theme };
