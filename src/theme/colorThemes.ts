import { nonPaletteColor } from './components';
import { palette } from './palette';
import { createThemeTokens } from './tokens';
import type { ThemeOptions } from './types';
import { createTheme } from '@/lib/stitches.config';

export type ThemeVariants = 'dark' | 'light' | 'appleMusicLight';
export type Themes = {
  [key in ThemeVariants]: ReturnType<typeof createTheme>;
};

const defaultDark: ThemeOptions = {
  colors: {},
};

const defaultLight: ThemeOptions = {
  colors: {
    secondaryBase: '#000',
    secondaryHighlight: '#262626',
    secondaryPress: '#000',
    ...palette.grayLight,
  },
  components: {
    textBase: 'black',
    // textSubdued: 'gray12',
    textSubdued: 'gray11',
    spotifyLogo: 'black',
    backgroundBase: 'gray1',
    playerBackground: 'white',

    sliderRangeBackground: 'gray12',

    buttonSecondaryColorBase: 'white',

    buttonTertiaryColorBase: 'black',
    buttonTertiaryBorderColorBase: nonPaletteColor('rgba(0, 0, 0, 0.3)'),
    buttonTertiaryBorderColorHighlight: 'black',

    buttonTertiarySubtleColorHighlight: 'black',

    navbarBorder: 'gray5',
    navbarLinkActiveColor: 'black',

    topbarButtonBackground: 'gray5',
    topbarButtonBackgroundHighlight: 'gray7',

    cardBackground: 'gray3',
    cardBackgroundHighlight: 'gray5',

    horizontalCardBackground: nonPaletteColor('rgba(0, 0, 0, 0.10)'),
    horizontalCardBackgroundHighlight: nonPaletteColor('rgba(0, 0, 0, 0.18)'),

    dropdownItemHighlight: nonPaletteColor('rgba(0, 0, 0, 0.1)'),

    pageColorizedBackground: nonPaletteColor('#f1f1f1'),

    // Replace with
    pageHeaderBackgroundOverlay: nonPaletteColor(
      'linear-gradient(transparent 0, hsla(0, 0%, 97%, 0.65) 100%)'
    ),
    pageHeaderDefaultTextColor: 'black',
    pageHeaderDefaultTextSubduedColor: 'gray12',
    pageContentDefaultBackgroundOverlay: nonPaletteColor(
      'linear-gradient(hsla(0, 0%, 97%, 0.75) 0, hsla(0, 0%, 97%, 1) 100%)'
    ),

    homepageIntroBackground: nonPaletteColor('#999999'),
    homepageIntroBackgroundOverlay: nonPaletteColor(
      'linear-gradient(rgba(255,255,255,.45) 0,hsla(0, 0%, 97%, 1) 100%)'
    ),

    tracklistBorderColor: nonPaletteColor('rgba(0, 0, 0, 0.08)'),
    tracklistRowHoverBackground: nonPaletteColor('rgba(0, 0, 0, 0.08)'),
    tracklistRowSelectedBackground: nonPaletteColor('rgba(0, 0, 0, 0.2)'),

    scrollbarThumbBackground: nonPaletteColor('rgba(0,0,0,0.3)'),
    scrollbarThumbBackgroundHover: nonPaletteColor('rgba(0,0,0,0.5)'),
    scrollbarThumbBackgroundActive: nonPaletteColor('rgba(0,0,0,0.7)'),
  },
};

const appleMusicLight: ThemeOptions = {
  colors: {
    ...defaultLight.colors,
    ...palette.grayLight,
    primaryBase: 'linear-gradient(90deg, #F35E71 0%, #C166A7 95%)',
    secondaryBase: '#000',
  },
  components: {
    ...defaultLight.components,
    backgroundBase: 'white',
    navbarLinkActiveBackground: 'primaryBase',
    navbarLinkActiveColor: 'white',
    connectBarColor: 'white',
  },
};

const colorThemes: Themes = {
  dark: createTheme('dark-theme', createThemeTokens(defaultDark)),
  light: createTheme('light-theme', createThemeTokens(defaultLight)),
  appleMusicLight: createTheme('apple-music-light-theme', createThemeTokens(appleMusicLight)),
};

export { colorThemes };
