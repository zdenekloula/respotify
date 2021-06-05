import NextLink from 'next/link';
import React from 'react';
import { CardImage } from './CardImage';
import { CardPlayButtonContainer, CardPlayButton } from './CardPlayButton';
import { CardTitle } from './CardTitle';
import { Text } from '@/components/text';
import { styled } from '@/lib/stitches.config';

export const CardContainer = styled('a', {
  display: 'block',
  background: '$cardBackground',
  cursor: 'pointer',
  width: '100%',
  padding: '$spacing05',
  transition: 'background-color .3s ease',
  borderRadius: '$base',
  color: 'inherit',
  '&:hover': {
    textDecoration: 'none',
    background: '$cardBackgroundHighlight',
    [`${CardPlayButtonContainer}`]: {
      opacity: 1,
      transform: 'translateY(0)',
      pointerEvents: 'all',
    },
  },
});

const CardImageContainer = styled('div', {
  position: 'relative',
  marginBlockEnd: '$spacing05',
});

const CardImageDescription = styled(Text, {
  '-webkit-line-clamp': '2',
  '-webkit-box-orient': 'vertical',
  display: '-webkit-box',
  overflow: 'hidden',
  whiteSpace: 'normal',
});

const CardContentContainer = styled('div', {
  minHeight: '62px',
});

type Props = {
  type: SpotifyApi.ContextObject['type'];
  src?: string;
  title: string;
  href: string;
  description: string | React.ReactElement | null;
  uri: string;
  isPlaying: boolean;
  currentContextUri: string | undefined;
};

const Card = React.memo(
  ({ uri, type, src, title, href, description, isPlaying, currentContextUri }: Props) => {
    return (
      <NextLink href={href} passHref>
        <CardContainer>
          <CardImageContainer>
            <CardImage type={type} src={src || ''} alt={title} />
            <CardPlayButton uri={uri} isPlaying={isPlaying} currentContextUri={currentContextUri} />
          </CardImageContainer>
          <CardContentContainer>
            <CardTitle>{title}</CardTitle>
            <CardImageDescription size="small">{description}</CardImageDescription>
          </CardContentContainer>
        </CardContainer>
      </NextLink>
    );
  }
);

Card.displayName = 'Card';

export { Card };
