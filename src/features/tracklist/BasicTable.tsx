/* eslint-disable @typescript-eslint/ban-types */
import React, { useCallback, memo as reactMemo } from 'react';
import { useTable, Row as RowType } from 'react-table';
import { areEqual } from 'react-window';
import { TableRow } from './BasicRow';
import type { RequiredCellProps } from './columnTypes';
import { CustomColumn, TableHeader } from './Header';
import { InfiniteScroll, LoadMoreProps } from './InfiniteScroll';
import { styled } from '@/lib/stitches.config';
import { memo } from '@/utils/memo';

export type Props<T extends object> = {
  ariaLabel?: string;
  noHeader?: boolean;
  getRowProps: (row: RowType<T>) => RequiredCellProps;
  data: Array<T>;
  columns: Array<CustomColumn<T, RequiredCellProps>>;
  loadMore?: LoadMoreProps;
  isLoading?: boolean;
  loadingPlaceholder: React.ReactNode;
};

const TableContainer = styled('div', {
  position: 'relative',
});

/**
 * The rerender can be triggered by changing the getRowProps mainly the isPlaying state
 * since it's only rerendering the "Wrapper" around the row not the row itself, the rerendering
 * shouldn't cause any performance issue
 */
type ItemProps = {
  index: number;
  style: React.CSSProperties;
  data: {
    rows: Array<RowType<object>>;
    getRowProps: Props<object>['getRowProps'];
    prepareRow: (row: RowType<object>) => void;
  };
};

const ListItem = reactMemo(({ index, style, data }: ItemProps) => {
  const { rows, getRowProps, prepareRow } = data;
  const row = rows[index];

  if (row) {
    prepareRow(row);
    const rowProps = getRowProps(row) || {};
    return (
      // eslint-disable-next-line react/jsx-key
      <div
        {...row.getRowProps({
          style,
        })}
      >
        <TableRow row={row} {...rowProps} />
      </div>
    );
  }

  return null;
}, areEqual);

function InnerTable<T extends object>({
  columns,
  data,
  noHeader,
  getRowProps,
  ariaLabel,
  loadMore,

  isLoading,
  loadingPlaceholder,
}: Props<T>) {
  const { getTableProps, getTableBodyProps, rows, prepareRow, headerGroups } = useTable<T>({
    columns,
    data,
  });

  const renderContent = useCallback(() => {
    if (isLoading) {
      return loadingPlaceholder ? loadingPlaceholder : null;
    }

    return (
      <div {...getTableBodyProps()}>
        <div>
          <InfiniteScroll<T>
            rows={rows}
            loadMore={loadMore}
            getRowProps={getRowProps}
            prepareRow={prepareRow}
          >
            {ListItem}
          </InfiniteScroll>
        </div>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            pointerEvents: 'none', //https://github.com/bvaughn/react-window/issues/455
          }}
        />
      </div>
    );
  }, [isLoading, loadingPlaceholder, getTableBodyProps, getRowProps, prepareRow, rows, loadMore]);

  return (
    <>
      <TableContainer {...getTableProps()} aria-label={ariaLabel} role="table">
        {!noHeader ? <TableHeader headerGroups={headerGroups} /> : null}
        {renderContent()}
      </TableContainer>
    </>
  );
}

const Table = memo(InnerTable);
Table.displayName = 'Table';

export { Table };
