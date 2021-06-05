import { throttle } from 'lodash-es';
import { useEffect, useRef } from 'react';
import type { FixedSizeList } from 'react-window';
import type InfiniteLoader from 'react-window-infinite-loader';

type InfiniteLoaderProps = typeof InfiniteLoader & {
  _listRef: FixedSizeList;
};

export function usePlaylistVirtualizedScroll(scrollerElement: HTMLDivElement | null) {
  const infiniteLoaderRef = useRef<InfiniteLoaderProps>(null);

  useEffect(() => {
    const list = infiniteLoaderRef.current?._listRef;

    const handleWindowScroll = throttle(() => {
      if (list && scrollerElement) {
        const scrollTop = scrollerElement.scrollTop;
        list.scrollTo(scrollTop);
      }
    }, 0);

    scrollerElement?.addEventListener('scroll', handleWindowScroll);
    return () => {
      handleWindowScroll.cancel();
      scrollerElement?.removeEventListener('scroll', handleWindowScroll);
    };
  }, [scrollerElement]);

  return infiniteLoaderRef;
}
