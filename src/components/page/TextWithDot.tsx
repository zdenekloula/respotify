import type * as Stitches from '@stitches/react';
import type { PropsWithChildren } from 'react';
import { Text } from '@/components/text';

type TextWithDotProps = {
  css?: Stitches.CSS;
};

export const TextWithDot = ({ children, css }: PropsWithChildren<TextWithDotProps>) => (
  <Text
    size="small"
    as="span"
    css={{
      color: '$pageHeaderDefaultTextSubduedColor',
      '&:before': {
        content: '•',
        marginInline: '4px',
        fontSize: '10px',
        color: '$pageHeaderDefaultTextSubduedColor',
      },
      ...css,
    }}
  >
    {children}
  </Text>
);
