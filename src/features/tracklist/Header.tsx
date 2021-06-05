/* eslint-disable @typescript-eslint/ban-types */

import React from 'react';
import type { CellProps, Column, HeaderGroup, IdType } from 'react-table';
import type { DeepOmit } from 'ts-essentials';
import { TracklistHeaderCell } from './HeaderCell';
import { styled } from '@/lib/stitches.config';
import { memo } from '@/utils/memo';

export const StyledTracklistHeaderContainer = styled('div', {
  position: 'sticky',
  height: '36px',
});

export const StyledTracklistHeader = styled('div', {
  display: 'grid',
  gridGap: '$spacing05',
  position: 'relative',
  padding: '0 $spacing05',
  height: '100%',
  borderBottom: '1px solid $tracklistBorderColor',
});

export type CustomCellProps<DataType extends object, Props> = CellProps<DataType> & Props;
export type CustomColumn<T extends object, V> = DeepOmit<
  Column<T>,
  {
    Cell: never;
  }
> & {
  id: IdType<T>;
  Cell?: (cellProps: CustomCellProps<T, V>) => JSX.Element | null;
};

type HeaderProps<T extends object> = {
  headerGroups: Array<HeaderGroup<T>>;
};

function HeaderInner<T extends object>({ headerGroups }: HeaderProps<T>) {
  return (
    <div>
      {headerGroups.map((headerGroup) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <StyledTracklistHeaderContainer {...headerGroup.getHeaderGroupProps()}>
            <StyledTracklistHeader>
              {headerGroup.headers.map((column) => (
                // eslint-disable-next-line react/jsx-key
                <TracklistHeaderCell id={column.id} {...column.getHeaderProps()}>
                  {column.render('Header')}
                </TracklistHeaderCell>
              ))}
            </StyledTracklistHeader>
          </StyledTracklistHeaderContainer>
        );
      })}
    </div>
  );
}

const TableHeader = memo(HeaderInner);
TableHeader.displayName = 'TableHeader';

export { TableHeader };
