export const sizes = {
  topbarHeight: '64px',
};

export type SizeTokens = typeof sizes;

export const createSizes = (newSizes: Partial<SizeTokens>): SizeTokens => {
  return {
    ...sizes,
    ...newSizes,
  };
};
