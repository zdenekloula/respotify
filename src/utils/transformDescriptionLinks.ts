export function transformSpotifyUriToLinks(text: string) {
  const transformedText = text
    .replaceAll(/spotify:artist:/g, '/artist/')
    .replaceAll(/spotify:album:/g, '/album/')
    .replaceAll(/spotify:playlist:/g, '/playlist/');
  return transformedText;
}
