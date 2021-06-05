import type { Palette } from 'node-vibrant/lib/color';
import { useLayoutEffect } from 'react';
import { getCoverColor } from '@/features/cover-color/getPalette';

const colorPriority = [
  'Vibrant',
  'DarkMuted',
  'DarkVibrant',
  'Muted',
  'LightVibrant',
  'LightMuted',
];

export async function getColor(imageUrl: string) {
  const coverColor = await getCoverColor(imageUrl);
  const totalPopulation = Object.values(coverColor).reduce(
    (accumulator, current) => accumulator + Number(current?.population),
    0
  );

  const color: keyof Palette =
    colorPriority.find(function (priority) {
      const percentage = Number(coverColor[priority]?.population) / totalPopulation;
      return percentage > 0.11;
    }) || 'Vibrant';

  return coverColor[color];
}

export function usePageColorizedBackground(imageUrl: string | undefined) {
  useLayoutEffect(() => {
    document.body.style.setProperty('--colors-pageColorizedBackground', null);

    const fetchColor = async (imageUrl: string) => {
      const imageColor = await getColor(imageUrl);
      if (imageColor) {
        document.body.style.setProperty('--colors-pageColorizedBackground', imageColor.getHex());
      }
    };

    if (!imageUrl) {
      return;
    }
    fetchColor(imageUrl);
  }, [imageUrl]);
}
