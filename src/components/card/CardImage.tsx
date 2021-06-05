import React from 'react';
import { styled } from '@/lib/stitches.config';

export const CardImageHolder = styled('div', {
  position: 'relative',
  width: '100%',
  paddingBottom: '100%',
  backgroundColor: '$gray06',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
  borderRadius: '$base',
  variants: {
    rounded: {
      true: {
        borderRadius: '50%',
      },
    },
  },
});

export const CardImageElement = styled('img', {
  display: 'block',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosisiton: 'center',
  borderRadius: '$base',
  variants: {
    rounded: {
      true: {
        borderRadius: '50%',
      },
    },
  },
});

type Props = {
  src: string;
  alt: string;
  type: SpotifyApi.ContextObject['type'];
};

export const CardImage = ({ type, src, alt }: Props) => {
  const isRounded = type === 'artist';
  return (
    <CardImageHolder rounded={isRounded}>
      <CardImageElement src={src} alt={alt} rounded={isRounded} />
    </CardImageHolder>
  );
};
