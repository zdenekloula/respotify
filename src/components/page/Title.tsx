import React, { useRef, useState } from 'react';
import useResizeObserver from 'use-resize-observer';
import { Heading } from '@/components/heading';
import { styled } from '@/lib/stitches.config';

const titleSizeVariants = [96, 72, 48, 32];

const useDynamicFontSize = () => {
  const [titleWrapperElement, setTitleWrapperElement] = useState<HTMLElement | null>(null);
  const titleElementRef = useRef<HTMLHeadingElement | null>(null);
  useResizeObserver<HTMLElement>({
    ref: titleWrapperElement,
  });

  if (titleElementRef.current) {
    for (const titleSizeVariant of titleSizeVariants) {
      titleElementRef.current.style.fontSize = `${titleSizeVariant}px`;

      const { paddingTop, paddingBottom } = getComputedStyle(titleElementRef.current);
      const paddingSum = Number.parseFloat(paddingTop) + Number.parseFloat(paddingBottom);
      const height = titleElementRef.current.clientHeight - paddingSum;

      if (height <= titleSizeVariant) {
        break;
      }
    }
  }

  return [setTitleWrapperElement, titleElementRef];
};

const PageTitleWrapper = styled('span', {
  '-webkit-line-clamp': 3,
  '-webkit-box-orient': ' vertical',
  display: '-webkit-box',
  overflow: 'hidden',
});

// Padding on the Heading component causes that truncated text is visible on the bottom but also without the padding, and the letter descenders were partially cut off
const PageTitleInner = styled('span', {
  position: 'relative',
  top: '-0.12em',
});

export const PageTitle: React.FC = ({ children }) => {
  const [wrapperElementRef, titleElementRef] = useDynamicFontSize();

  return (
    <PageTitleWrapper
      ref={wrapperElementRef}
      css={{
        marginBlockEnd: '$spacing04',
      }}
    >
      <Heading
        ref={titleElementRef}
        as="h1"
        size={'18'}
        css={{
          letterSpacing: '-0.04em',
          paddingBlockStart: '$spacing03',
        }}
        weight="extraBold"
      >
        <PageTitleInner>{children}</PageTitleInner>
      </Heading>
    </PageTitleWrapper>
  );
};
