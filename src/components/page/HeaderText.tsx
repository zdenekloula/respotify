import type * as Stitches from '@stitches/react';
import type { PropsWithChildren } from 'react';
import { Text } from '@/components/text';

export const HeaderTextColorVariants = {
  base: '$pageHeaderDefaultTextColor',
  subdued: '$pageHeaderDefaultTextSubduedColor',
  currentColor: 'currentColor',
};

type TextVariants = Stitches.VariantProps<typeof Text>;
type HeaderTextProps = Omit<TextVariants, 'color'> & {
  color?: keyof typeof HeaderTextColorVariants;
};

export const HeaderText = ({
  children,
  color = 'subdued',
  ...textProps
}: PropsWithChildren<HeaderTextProps>) => (
  <Text
    size="small"
    as="span"
    {...textProps}
    css={{
      color: HeaderTextColorVariants[color],
    }}
  >
    {children}
  </Text>
);
