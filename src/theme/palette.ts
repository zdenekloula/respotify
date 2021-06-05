export const palette = {
  primary: {
    primaryBase: '#1ed760',
    primaryHighlight: '#1fdf64',
    primaryPress: '#169c46',
  },
  secondary: {
    secondaryBase: '#fff',
    secondaryHighlight: '#fff',
    secondaryPress: '#fff',
  },
  grayLight: {
    gray0: 'hsla(0, 0%, 100%, 1)',
    gray1: 'hsla(0, 0%, 97%, 1)',
    gray2: 'hsla(0, 0%, 95%, 1)',
    gray3: 'hsla(0, 0%, 93%, 1)',
    gray4: 'hsla(0, 0%, 91%, 1)',
    gray5: 'hsla(0, 0%, 89%, 1)',
    gray6: 'hsla(0, 0%, 87%, 1)',
    gray7: 'hsla(0, 0%, 82%, 1)',
    gray8: 'hsla(0, 0%, 78%, 1)',
    gray9: 'hsla(0, 0%, 56%, 1)',
    gray10: 'hsla(0, 0%, 52%, 1)',
    gray11: 'hsla(0, 0%, 44%, 1)',
    gray12: 'hsla(0, 0%, 7%, 1)',
  },
  grayDark: {
    gray0: 'hsla(0, 0%, 0%, 1)',
    gray1: 'hsla(0, 0%, 7%, 1)',
    gray2: 'hsla(0, 0%, 9%, 1)',
    gray3: 'hsla(0, 0%, 11%, 1)',
    gray4: 'hsla(0, 0%, 14%, 1)',
    gray5: 'hsla(0, 0%, 16%, 1)',
    gray6: 'hsla(0, 0%, 20%, 1)',
    gray7: 'hsla(0, 0%, 24%, 1)',
    gray8: 'hsla(0, 0%, 30%, 1)',
    gray9: 'hsla(0, 0%, 33%, 1)',
    gray10: 'hsla(0, 0%, 49%, 1)',
    gray11: 'hsla(0, 0%, 70%, 1)',
    gray12: 'hsla(0, 0%, 93%, 1)',
  },
  neutral: {
    black: '#000',
    white: '#fff',
    transparent: 'transparent',
  },
  action: {},
};

export type NeutralColors = typeof palette['neutral'];
export type GrayColors = typeof palette['grayDark'];
export type PrimaryColors = typeof palette['primary'];
export type SecondaryColors = typeof palette['secondary'];

export type ColorTokensWithoutComponents = PrimaryColors &
  SecondaryColors &
  GrayColors &
  NeutralColors;

export const createPalette = (
  newPalette: Partial<ColorTokensWithoutComponents>
): ColorTokensWithoutComponents => {
  return {
    ...palette.primary,
    ...palette.secondary,
    ...palette.grayDark,
    ...palette.neutral,

    // Override default palette
    ...newPalette,
  };
};
