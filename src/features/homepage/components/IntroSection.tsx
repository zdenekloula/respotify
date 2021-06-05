import React, { useRef, useState } from 'react';
import { Greeting } from './Greeting';
import { IntroBackground } from './IntroBackground';
import { RecentlyPlayedTracks } from './RecentlyPlayedTracks';
import { Box } from '@/components/box';
import type { HorizontalCardMouseEnterOptions } from '@/components/card/HorizontalCard';
import { getColor } from '@/hooks/usePageColorizedBackground';

type HomepageIntroSectionProps = {
  recentlyPlayedTracks: SpotifyApi.UsersRecentlyPlayedTracksResponse;
};

export const HomepageIntroSection = ({ recentlyPlayedTracks }: HomepageIntroSectionProps) => {
  const defaultColor = useRef(
    getComputedStyle(document.documentElement).getPropertyValue('--colors-homepageIntroBackground')
  );
  const [color, setColor] = useState(() => defaultColor.current);

  const onCardMouseEnter = async ({ src }: HorizontalCardMouseEnterOptions) => {
    if (!src) {
      return;
    }
    const color = await getColor(src);
    if (color) {
      setColor(color.getHex());
    }
  };

  const onCardMouseLeave = () => {
    setColor(defaultColor.current);
  };

  return (
    <>
      <section
        style={
          {
            '--colors-homepageIntroBackground': color,
          } as React.CSSProperties
        }
      >
        <IntroBackground />
        <Box>
          <Greeting />
        </Box>
        <RecentlyPlayedTracks
          recentlyPlayedTracks={recentlyPlayedTracks}
          onCardMouseEnter={onCardMouseEnter}
          onCardMouseLeave={onCardMouseLeave}
        />
      </section>
    </>
  );
};
