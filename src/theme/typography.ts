export type FontsTokens = typeof fonts;
export type FontWeightTokens = typeof fontWeights;
export type FontSizeTokens = typeof fontSizes;
export type TypographyTokens = FontsTokens & FontWeightTokens & FontSizeTokens;

//https://www.carbondesignsystem.com/guidelines/typography/overview#scale
export const fontSizes = {
  fontSize01: '0.75rem', //12px
  fontSize02: '0.875rem', //14px
  fontSize03: '1rem', //16px
  fontSize04: '1.125rem', //18px
  fontSize05: '1.25rem', //20px
  fontSize06: '1.5rem', //24px
  fontSize07: '1.75rem', //28px
  fontSize08: '2rem', //32px
  fontSize09: '2.25rem', //36px
  fontSize10: '2.625rem', //42px
  fontSize11: '3rem', //48px
  fontSize12: '3.375rem', //54px
  fontSize13: '3.75rem', //60px
  fontSize14: '4.25rem', //68px
  fontSize15: '4.75rem', //76px
  fontSize16: '5.25rem', //84px
  fontSize17: '5.75rem', //92px
  fontSize18: '6rem', //96px
};

export const fonts = {
  fontDefault:
    '"Plus Jakarta Sans VF", Helvetica Neue, Helvetica, Arial, Hiragino Kaku Gothic Pro, Meiryo, MS Gothic, sans-serif',
};

export const fontWeights = {
  fontWeightNormal: 400,
  fontWeightBold: 700,
  fontWeightExtraBold: 900,
};

export const createFonts = (newFonts: Partial<FontsTokens>): FontsTokens => {
  return {
    ...fonts,
    ...newFonts,
  };
};

export const createFontSizes = (newFontSizes: Partial<FontSizeTokens>): FontSizeTokens => {
  return {
    ...fontSizes,
    ...newFontSizes,
  };
};

export const createFontWeights = (newFontWeights: Partial<FontWeightTokens>): FontWeightTokens => {
  return {
    ...fontWeights,
    ...newFontWeights,
  };
};
