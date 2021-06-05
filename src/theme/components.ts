import type { ColorTokensWithoutComponents } from './palette';
import type { ColorTokens } from './types';

type ColorToken = keyof ColorTokensWithoutComponents;

export function nonPaletteColor(color: string) {
  return () => color;
}

type CustomToken = () => string;
export type ComponentColorTokensInput = Record<
  keyof ReturnType<typeof createDefaultComponentTokens>,
  ColorToken | CustomToken
>;

const createDefaultComponentTokens = (
  colorTokensWithoutComponents: ColorTokensWithoutComponents
) => {
  const tokens = colorTokensWithoutComponents;
  return {
    backgroundBase: tokens.gray1,
    textBase: tokens.white,
    textSubdued: tokens.gray11,
    spotifyLogo: tokens.white,

    skeletonBackground: tokens.gray5,

    buttonPrimaryBackgroundBase: tokens.primaryBase,
    buttonPrimaryBackgroundHighlight: tokens.primaryHighlight,
    buttonPrimaryBackgroundPress: tokens.primaryPress,
    buttonPrimaryColorBase: '#000',

    buttonSecondaryBackgroundBase: tokens.secondaryBase,
    buttonSecondaryBackgroundHighlight: tokens.secondaryHighlight,
    buttonSecondaryBackgroundPress: tokens.secondaryPress,
    buttonSecondaryColorBase: '#000',

    buttonTertiaryColorBase: '#fff',
    buttonTertiaryBorderColorBase: 'rgba(255, 255, 255, 0.3)',
    buttonTertiaryBorderColorHighlight: tokens.white,

    buttonTertiarySubtleColorBase: tokens.gray11,
    buttonTertiarySubtleColorHighlight: tokens.white,

    cardBackground: tokens.gray2,
    cardBackgroundHighlight: tokens.gray5,

    horizontalCardBackground: 'rgba(255, 255, 255, 0.1)',
    horizontalCardBackgroundHighlight: 'rgba(255, 255, 255, 0.2)',

    dropdownBackground: tokens.gray5,
    dropdownItemHighlight: 'rgba(255, 255, 255, 0.1)',

    navbarBackground: tokens.gray0,
    navbarLinkBackground: tokens.transparent,
    navbarLinkActiveBackground: tokens.transparent,
    navbarLinkActiveColor: tokens.white,
    navbarBorder: tokens.transparent,
    navbarSeparatorBackground: tokens.gray5,

    topbarButtonBackground: 'rgba(0,0,0,0.7)',
    topbarButtonBackgroundHighlight: tokens.gray5,

    playerBackground: tokens.gray2,

    pageColorizedBackground: '#383838',

    pageHeaderBackgroundOverlay: 'linear-gradient(transparent 0,rgba(0,0,0,.5) 100%)',
    pageHeaderDefaultTextColor: tokens.white,
    pageHeaderDefaultTextSubduedColor: 'rgba(255, 255, 255, 0.7)',

    pageContentDefaultBackgroundOverlay: `linear-gradient(rgba(0,0,0,.6) 0, ${tokens.gray1} 100%)`,

    homepageIntroBackground: '#535353',
    homepageIntroBackgroundOverlay: 'linear-gradient(rgba(0,0,0,.6) 0,#121212 100%)',

    sliderTrackBackground: tokens.gray8,
    sliderRangeBackground: tokens.white,

    connectBarBackground: tokens.primaryBase,
    connectBarColor: tokens.black,

    tracklistBorderColor: 'rgba(255, 255, 255, 0.1)',
    tracklistRowHoverBackground: 'rgba(255, 255, 255, 0.1)',
    tracklistRowSelectedBackground: 'rgba(255, 255, 255, 0.3)',

    scrollbarThumbBackground: 'rgba(255, 255, 255, 0.3)',
    scrollbarThumbBackgroundHover: 'rgba(255, 255, 255, 0.5)',
    scrollbarThumbBackgroundActive: 'rgba(255, 255, 255, 0.7)',
  };
};
export type ComponentTokens = ReturnType<typeof createDefaultComponentTokens>;

const createOverwriteTokens = (
  colorTokensWithoutComponents: ColorTokensWithoutComponents,
  components: Partial<ComponentColorTokensInput> = {}
): Partial<ComponentTokens> => {
  const componentTokens = {} as Partial<ComponentTokens>; // TODO: remove type assertion
  const componentTokensKeys = Object.keys(components) as Array<keyof ComponentColorTokensInput>;

  for (const key of componentTokensKeys) {
    const token = components[key];
    if (token) {
      if (typeof token === 'function') {
        componentTokens[key] = token();
      } else {
        componentTokens[key] = colorTokensWithoutComponents[token];
      }
    }
  }

  return componentTokens;
};

export const createTokensWithComponents = (
  colorTokensWithoutComponents: ColorTokensWithoutComponents,
  components: Partial<ComponentColorTokensInput>
): ColorTokens => {
  return {
    ...colorTokensWithoutComponents,
    ...createDefaultComponentTokens(colorTokensWithoutComponents),
    ...createOverwriteTokens(colorTokensWithoutComponents, components),
  };
};
