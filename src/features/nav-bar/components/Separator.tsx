import { styled } from '@/lib/stitches.config';

export const NavbarSeparator = styled('hr', {
  border: 'none',
  background: '$navbarSeparatorBackground',
  height: '1px',
  marginInline: '$spacing06',
  marginBlockStart: '$spacing03',
  marginBlockEnd: '$spacing03',
});
