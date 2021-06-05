import type { ComponentColorTokensInput, ComponentTokens } from './components';
import type { ColorTokensWithoutComponents } from './palette';
import type { RadiiTokens } from './radii';
import type { SizeTokens } from './sizes';
import type { SpacingTokens } from './spacing';
import type { TypographyTokens, FontsTokens, FontSizeTokens, FontWeightTokens } from './typography';

export type ColorTokens = ColorTokensWithoutComponents & ComponentTokens;

export type Tokens = ColorTokens & SpacingTokens & TypographyTokens;
export type Theme = {
  colors: ColorTokens;
  space: SpacingTokens;
  fonts: FontsTokens;
  fontSizes: FontSizeTokens;
  fontWeights: FontWeightTokens;
  sizes: SizeTokens;
  radii: RadiiTokens;
};

export type ThemeOptions = {
  colors: Partial<ColorTokensWithoutComponents>;
  space?: Partial<SpacingTokens>;
  fonts?: Partial<FontsTokens>;
  fontSizes?: Partial<FontSizeTokens>;
  fontWeights?: Partial<FontWeightTokens>;
  components?: Partial<ComponentColorTokensInput>;
};
