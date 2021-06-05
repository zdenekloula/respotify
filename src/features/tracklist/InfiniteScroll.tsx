import { throttle } from 'lodash-es';
import React, { useRef } from 'react';
import type { Row } from 'react-table';
import { FixedSizeList, ListProps } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import type { RequiredCellProps } from './columnTypes';
import { useLayout } from '@/components/layout/MainLayoutContext';

type InfiniteLoaderProps = typeof InfiniteLoader & {
  _listRef: FixedSizeList;
};
export type LoadMoreProps = {
  enabled: boolean;
  callback?: () => void;
  isLoading?: boolean;
  totalCount?: number;
};

type InfiniteScrollProps<T extends object> = {
  rows: Array<Row<T>>;
  getRowProps: (row: Row<T>) => RequiredCellProps;
  prepareRow: (row: Row<T>) => void;
  loadMore?: LoadMoreProps;
  children: ListProps['children'];
};

export const InfiniteScroll = <T extends object>({
  rows,
  getRowProps,
  prepareRow,
  loadMore,
  children,
}: InfiniteScrollProps<T>) => {
  const { mainView } = useLayout();
  const infiniteLoaderRef = useRef<InfiniteLoaderProps>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const list = infiniteLoaderRef.current?._listRef;

    const handleWindowScroll = throttle(() => {
      if (list && mainView) {
        const offsetTop =
          mainView.scrollHeight - (outerRef.current?.getBoundingClientRect().height || 0);
        const scrollTop = mainView.scrollTop - offsetTop;
        list.scrollTo(scrollTop);
      }
    }, 0);

    mainView?.addEventListener('scroll', handleWindowScroll);
    return () => {
      handleWindowScroll.cancel();
      mainView?.removeEventListener('scroll', handleWindowScroll);
    };
  }, [mainView]);

  const itemCount = loadMore?.enabled ? rows.length + 1 : rows.length;
  const loadMoreItems = loadMore?.isLoading
    ? () => {}
    : () => {
        if (loadMore?.callback) {
          loadMore?.callback();
        }
      };
  const isItemLoaded = (index: number) => !loadMore?.enabled || index < rows.length;

  return (
    <InfiniteLoader
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      ref={infiniteLoaderRef}
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <FixedSizeList
          ref={ref}
          outerRef={outerRef}
          style={{
            width: '100%',
            height: '100%',
            display: 'inline-block',
          }}
          height={window.innerHeight}
          width={window.innerWidth}
          itemCount={loadMore?.totalCount || itemCount}
          itemData={{
            rows,
            getRowProps,
            prepareRow,
          }}
          itemSize={56}
          onItemsRendered={onItemsRendered}
        >
          {children}
        </FixedSizeList>
      )}
    </InfiniteLoader>
  );
};
