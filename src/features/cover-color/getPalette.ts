import Vibrant from 'node-vibrant';

export type PaletteColors = {
  vibrant?: string;
  muted?: string;
  darkVibrant?: string;
  darkMuted?: string;
  lightVibrant?: string;
  lightMuted?: string;
};

export async function getPalette(source: string) {
  const palette = await Vibrant.from(source).getPalette();
  return palette;
}

export const getMosaicFirstPhoto = (mosaicUrl: URL) => {
  const url = mosaicUrl.href.split('/');
  const mosaicId = url[url.length - 1];
  const firstPhoto = mosaicId.slice(0, 40);
  const newUrl = mosaicUrl.href.replace(mosaicId, firstPhoto);
  return newUrl;
};

export const parseCoverImage = (url: string) => {
  const imageUrl = new URL(url);
  if (imageUrl.hostname === 'mosaic.scdn.co') {
    return getMosaicFirstPhoto(imageUrl);
  }
  return url.toString();
};

export async function getCoverColor(url: string) {
  const imageUrl = parseCoverImage(url);
  const palette = await getPalette(imageUrl);
  return palette;
}
