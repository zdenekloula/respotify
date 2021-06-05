import React from 'react';
import { Heading } from '@/components/heading';
import { Text } from '@/components/text';
import { styled } from '@/lib/stitches.config';

const CardTitleContainer = styled('div', {
  display: 'inline-block',
  position: 'relative',
  zIndex: 1,
  maxWidth: '100%',
  '&:hover': {
    textDecoration: 'none',
  },
});

const CardTitleText = styled(Heading, {
  paddingBlockEnd: '$spacing02',
});

type Props = {
  children: React.ReactNode;
};

export const CardTitle = ({ children }: Props) => {
  return (
    <CardTitleContainer>
      <CardTitleText as="p" type="heading04" size="3" weight="bold">
        <Text as="span" ellipsis weight="bold">
          {children}
        </Text>
      </CardTitleText>
    </CardTitleContainer>
  );
};
