import type * as Stitches from '@stitches/react';
import type { PropsWithChildren } from 'react';
import { Heading } from '@/components/heading';
import { styled } from '@/lib/stitches.config';

export const PageContentSection = styled('div', {
  marginBlockEnd: '$spacing08',
  paddingInline: '$spacing05',

  '@bp3': {
    paddingInline: '$spacing07',
  },
});

type PageContentSectionHeadingProps = {
  css?: Stitches.CSS;
};

export const PageContentSectionHeading = ({
  children,
  css,
}: PropsWithChildren<PageContentSectionHeadingProps>) => {
  return (
    <Heading
      as="h2"
      type="heading02"
      size="6"
      weight="bold"
      color="base"
      css={{
        marginBlockEnd: '$spacing06',
        ...css,
      }}
    >
      {children}
    </Heading>
  );
};
