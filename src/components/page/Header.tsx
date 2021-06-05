import React, { PropsWithChildren } from 'react';
import { PageHeaderImage } from './Image';
import { styled } from '@/lib/stitches.config';

type PageHeaderProps = {
  name: string;
  coverImageUrl?: string;
  imageUrl?: string;
};

const PageHeaderWrapper = styled('div', {
  position: 'relative',
  display: 'flex',
  height: '30vh',
  maxHeight: '500px',
  minHeight: '340px',
  paddingInline: '$spacing05',
  paddingBlockEnd: '$spacing06',
  marginBlockStart: `-$sizes$topbarHeight`,
  '@bp3': {
    paddingInline: '$spacing07',
  },
  variants: {
    isCoverImage: {
      true: {
        height: '40vh',
        overflow: 'hidden',
      },
    },
  },
});

const PageHeaderBackground = styled('div', {
  display: 'block',
  height: '100%',
  left: 0,
  position: 'absolute',
  top: 0,
  width: '100%',
  background: '$pageColorizedBackground',
  backgroundPosition: '50% 15%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  contain: 'strict',
});

const PageHeaderBackgroundOverlay = styled(PageHeaderBackground, {
  background: '$pageHeaderBackgroundOverlay',
});

const PageHeaderImageWrapper = styled('div', {
  position: 'relative',
  alignSelf: 'flex-end',
  marginInlineEnd: '$spacing06',
});

const PageHeaderMetaWrapper = styled('div', {
  position: 'relative',
  alignSelf: 'flex-end',
  flex: 1,
});

export const PageHeader = ({
  children,
  coverImageUrl,
  imageUrl,
  name,
}: PropsWithChildren<PageHeaderProps>) => {
  const renderHeaderContent = () => {
    if (coverImageUrl) {
      return (
        <>
          <PageHeaderBackground
            css={{
              transform: 'scale(1.1)',
            }}
            style={{
              backgroundImage: `url("${coverImageUrl}")`,
            }}
          />
          <PageHeaderBackgroundOverlay />
          <PageHeaderMetaWrapper>{children}</PageHeaderMetaWrapper>
        </>
      );
    }
    return (
      <>
        <PageHeaderBackground />
        <PageHeaderBackgroundOverlay />
        <PageHeaderImageWrapper>
          <PageHeaderImage src={imageUrl || ''} alt={name} />
        </PageHeaderImageWrapper>
        <PageHeaderMetaWrapper>{children}</PageHeaderMetaWrapper>
      </>
    );
  };
  return (
    <PageHeaderWrapper isCoverImage={Boolean(coverImageUrl)}>
      {renderHeaderContent()}
    </PageHeaderWrapper>
  );
};
