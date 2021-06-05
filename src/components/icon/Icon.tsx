import React from 'react';
import type { IconType } from './types.generated';
import { styled } from '@/lib/stitches.config';

type Props = {
  name: IconType;
};

export const IconContainer = styled('span', {
  display: 'inline-block',
  position: 'relative',
});

const IconSVG = styled('svg', {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  fill: 'currentColor',
  pointerEvents: 'none',
});

export const Icon = ({ name }: Props) => {
  return (
    <IconContainer>
      <IconSVG xmlnsXlink="http://www.w3.org/1999/xlink">
        <use
          xlinkHref={`/icons-sprite.svg#icon-${name}`}
          x="0"
          y="0"
          width="100%"
          height="100%"
        ></use>
      </IconSVG>
    </IconContainer>
  );
};
