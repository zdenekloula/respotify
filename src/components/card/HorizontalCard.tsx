import NextLink from 'next/link';
import React from 'react';
import { Flex } from '../flex';
import { Heading } from '../heading';
import { CardImage, CardImageElement, CardImageHolder } from './CardImage';
import { CardPlayButtonContainer, CardPlayButton } from './CardPlayButton';
import { styled } from '@/lib/stitches.config';

export const CardContainer = styled('a', {
  '--card-height': '80px',
  display: 'block',
  background: '$horizontalCardBackground',
  color: 'inherit',
  cursor: 'pointer',
  width: '100%',
  height: 'var(--card-height)',
  transition: 'background-color .3s ease',
  borderRadius: '$base',
  overflow: 'hidden',
  '&:hover': {
    textDecoration: 'none',
    background: '$horizontalCardBackgroundHighlight',
    [`${CardPlayButtonContainer}`]: {
      opacity: 1,
      pointerEvents: 'all',
    },
  },
});

const CardImageContainer = styled('div', {
  position: 'relative',
  width: 'var(--card-height)',
  height: 'var(--card-height)',
  [`${CardImageHolder}, ${CardImageElement}`]: {
    borderRadius: 0,
  },
});

const CardContentContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  justifyContent: 'space-between',
  paddingInline: '$spacing05',
  [`${CardPlayButtonContainer}`]: {
    position: 'relative',
    marginLeft: '$spacing05',
    right: 'inherit',
    bottom: 'inherit',
    transform: 'inherit',
  },
});

const CardTitle = styled(Heading, {
  '-webkit-line-clamp': 2,
  '-webkit-box-orient': 'vertical',
  display: '-webkit-box',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'normal',
  wordBreak: 'break-word',
});

export type HorizontalCardMouseEnterOptions = {
  uri: string;
  src: string | undefined;
};

export type HorizontalCardMouseActions = {
  onMouseEnter?: (options: HorizontalCardMouseEnterOptions) => void;
  onMouseLeave?: () => void;
};

type Props = {
  uri: string;
  src: string | undefined;
  title: string;
  href: string;
  isPlaying: boolean;
  currentContextUri: string | undefined;
} & HorizontalCardMouseActions;

const HorizontalCard = React.memo(
  ({ uri, src, title, href, isPlaying, currentContextUri, onMouseEnter, onMouseLeave }: Props) => {
    const handleMouseEnter = React.useCallback(() => {
      if (onMouseEnter) {
        onMouseEnter({
          uri,
          src,
        });
      }
    }, [onMouseEnter, uri, src]);

    return (
      <NextLink href={href} passHref>
        <CardContainer onMouseEnter={handleMouseEnter} onMouseLeave={onMouseLeave}>
          <Flex>
            <CardImageContainer>
              <CardImage type="playlist" src={src || ''} alt={title} />
            </CardImageContainer>
            <CardContentContainer>
              <CardTitle as="p" type="heading04" size="3" weight="bold">
                {title}
              </CardTitle>
              <CardPlayButton
                uri={uri}
                isPlaying={isPlaying}
                currentContextUri={currentContextUri}
              />
            </CardContentContainer>
          </Flex>
        </CardContainer>
      </NextLink>
    );
  }
);

HorizontalCard.displayName = 'HorizontalCard';

export { HorizontalCard };
