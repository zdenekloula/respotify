import * as React from 'react';

import { Box } from '@/components/box';
import { Slider } from '@/components/slider';
import { Text } from '@/components/text';
import { styled } from '@/lib/stitches.config';
import { msToTime } from '@/utils/formatMsToTime';

const PlaybackBarWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

type Props = {
  // Callback function that is fired when the slider's value changed.
  onChange: (value: number) => void;
  position?: number;
  durationMs?: number;
  disabled?: boolean;
};

const PlaybackBar = ({ onChange, position = 0, durationMs = 0, disabled = false }: Props) => {
  const [value, setValue] = React.useState<number>(() => position);
  const [isDragging, setIsDragging] = React.useState(false);

  React.useEffect(() => {
    if (!isDragging) {
      setValue(position);
    }
  }, [position, isDragging]);

  const handleUpdate = (value: number, isDragging: boolean) => {
    setValue(value);
    if (!isDragging) {
      onChange(value);
    }
  };

  return (
    <>
      <PlaybackBarWrapper>
        <Box
          css={{
            textAlign: 'right',
          }}
        >
          <Text
            css={{
              fontSize: '11px',
            }}
          >
            {value ? msToTime(value) : '00:00'}
          </Text>
        </Box>
        <Slider
          max={durationMs}
          min={0}
          step={1000}
          aria-label="Position"
          disabled={disabled}
          onValueChange={(value) => {
            handleUpdate(value[0], isDragging);
          }}
          onPointerUp={() => {
            setIsDragging(false);
            handleUpdate(value, false);
          }}
          onPointerDown={() => {
            setIsDragging(true);
          }}
          value={[value]}
        />
        <Box
          css={{
            textAlign: 'left',
          }}
        >
          <Text
            css={{
              fontSize: '11px',
            }}
          >
            {durationMs ? msToTime(durationMs) : '00:00'}
          </Text>
        </Box>
      </PlaybackBarWrapper>
    </>
  );
};

export { PlaybackBar };
