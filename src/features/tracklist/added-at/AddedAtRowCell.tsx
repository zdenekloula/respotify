import dayjs from 'dayjs';
import localizedFormatPlugin from 'dayjs/plugin/localizedFormat';
import relativeTimePlugin from 'dayjs/plugin/relativeTime';
import utcPlugin from 'dayjs/plugin/utc';
import React from 'react';
import { Text } from '@/components/text';
import { styled } from '@/lib/stitches.config';
dayjs.extend(relativeTimePlugin);
dayjs.extend(utcPlugin);
dayjs.extend(localizedFormatPlugin);

export type AddedAtProps = {
  addedAt: string;
};

export const AddedAtContainer = styled(Text, {
  gridColumn: 'addedAt',
  display: 'flex',
  alignItems: 'center',
});

const getFormattedTime = (addedAt: string) => {
  const addedAtTime = dayjs(addedAt);
  const addedAtTimeISO = addedAtTime.toISOString();

  // Unix epoch time in ISO
  const startingTimeISO = dayjs(0).toISOString();
  if (addedAtTimeISO === startingTimeISO) {
    return null;
  }

  const now = dayjs(new Date());
  const monthsDiff = addedAtTime.diff(now, 'month');

  if (monthsDiff < 0) {
    // Currently english only
    return addedAtTime.format('ll');
  }

  return dayjs(addedAt).fromNow();
};

export const AddedAt = ({ addedAt }: AddedAtProps) => {
  const formattedTime = getFormattedTime(addedAt);
  return (
    <AddedAtContainer color="subdued" size="small">
      {formattedTime}
    </AddedAtContainer>
  );
};
