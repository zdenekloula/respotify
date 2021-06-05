import React, { PropsWithChildren } from 'react';
import { Box } from '@/components/box';

type TracklistHeaderCellProps = {
  id: string;
};

export const TracklistHeaderCell = ({
  children,
  id,
}: PropsWithChildren<TracklistHeaderCellProps>) => {
  return (
    <Box
      aria-label="header-cell"
      css={{
        display: 'grid',
        alignItems: 'center',
        gridColumn: id,
      }}
    >
      {children}
    </Box>
  );
};
