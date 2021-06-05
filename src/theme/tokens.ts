import { createTokensWithComponents } from './components';
import { createPalette } from './palette';
import { createRadii } from './radii';
import { createSizes } from './sizes';
import { createSpacing } from './spacing';
import type { Theme, ThemeOptions } from './types';
import { createFontSizes, createFontWeights, createFonts } from './typography';

export const createThemeTokens = (options: ThemeOptions): Theme => {
  const {
    colors,
    space = {},
    components = {},
    fontSizes = {},
    fontWeights = {},
    fonts = {},
  } = options;
  const colorTokensWithoutComponents = createPalette(colors);
  const colorTokens = createTokensWithComponents(colorTokensWithoutComponents, components);
  const spacingTokens = createSpacing(space);
  const fontsTokens = createFonts(fonts);
  const fontSizesTokens = createFontSizes(fontSizes);
  const fontWeightsTokens = createFontWeights(fontWeights);
  const sizes = createSizes({});
  const radii = createRadii({});

  return {
    colors: colorTokens,
    space: spacingTokens,
    fonts: fontsTokens,
    fontSizes: fontSizesTokens,
    fontWeights: fontWeightsTokens,
    sizes,
    radii,
  };
};
