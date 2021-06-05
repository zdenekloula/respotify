import { useRouter } from 'next/router';
import React from 'react';
import { SubduedText } from '@/components/page';
import { Text } from '@/components/text';
import { transformSpotifyUriToLinks } from '@/utils/transformDescriptionLinks';

type Props = {
  text: string;
};

const isLinkElement = (element: HTMLElement): element is HTMLLinkElement => element.tagName === 'A';

export const Description = ({ text }: Props) => {
  const router = useRouter();
  return (
    <Text size="small">
      <SubduedText
        dangerouslySetInnerHTML={{
          __html: transformSpotifyUriToLinks(text),
        }}
        onClick={(event) => {
          const element = event.target;
          if (!(element instanceof HTMLElement)) {
            return;
          }
          if (isLinkElement(element)) {
            event.preventDefault();
            router.push(element.href);
          }
        }}
      />
    </Text>
  );
};
