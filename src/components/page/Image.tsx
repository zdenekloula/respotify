import React from 'react';
import { styled } from '@/lib/stitches.config';

export const ImageWrapper = styled('div', {
  height: '192px',
  minWidth: '192px',
  width: '192px',
  boxShadow: '0 4px 60px rgba(0, 0, 0, 0.5)',
  overflow: 'hidden',

  '@bp4': {
    height: '232px',
    minWidth: '232px',
    width: '232px',
  },
});

const Image = styled('img', {
  height: '100%',
  width: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
});

type PageHeaderImageProps = {
  src: string;
  alt: string;
};

export const PageHeaderImage = ({ src, alt }: PageHeaderImageProps) => {
  return (
    <ImageWrapper>
      <Image src={src} alt={alt} />
    </ImageWrapper>
  );
};
