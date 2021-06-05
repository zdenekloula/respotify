import * as React from 'react';
import { Slider } from '@/components/slider';

type Props = {
  onChange: (value: number) => void;
  volume?: number;
  disabled?: boolean;
};

const VolumeBar = React.memo(({ onChange, volume = 0, disabled = false }: Props) => {
  const [value, setValue] = React.useState<number>(() => volume);
  const [isDragging, setIsDragging] = React.useState(false);

  React.useEffect(() => {
    if (!isDragging) {
      setValue(volume);
    }
  }, [volume, isDragging]);

  const handleUpdate = (value: number) => {
    setValue(value);
    onChange(value);
  };

  return (
    <Slider
      max={1}
      min={0}
      step={0.01}
      aria-label="Volume"
      disabled={disabled}
      onValueChange={(value) => {
        handleUpdate(value[0]);
      }}
      onPointerUp={() => {
        setIsDragging(false);
      }}
      onPointerDown={() => {
        setIsDragging(true);
      }}
      value={[value]}
    />
  );
});

VolumeBar.displayName = 'VolumeBar';

export { VolumeBar };
