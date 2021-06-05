export type SpacingTokens = typeof spacing;

export const spacing = {
  spacing00: '0',
  spacing01: '0.125rem', //2px
  spacing02: '0.25rem', //4px
  spacing03: '0.5rem', //8px
  spacing04: '0.75rem', //12px
  spacing05: '1rem', //16px
  spacing06: '1.5rem', //24px
  spacing07: '2rem', //32px
  spacing08: '2.5rem', //40px
  spacing09: '3rem', //48px
  spacing10: '4rem', //64px
};

export const createSpacing = (newSpacing: Partial<SpacingTokens>): SpacingTokens => {
  return {
    ...spacing,
    ...newSpacing,
  };
};
