type MetadataFormatAttribute = {
  key: string;
  value: string;
};

export type PlaylistMetadataResponse = {
  attributes: {
    name: string;
    description?: string;
    picture?: string;
    collaborative?: boolean;
    format?: string;
    formatAttributes?: Array<MetadataFormatAttribute>;
  };
};

export const getPlaylistMetadata = async (playlistId: string, token: string) => {
  return fetch(`https://spclient.wg.spotify.com/playlist/v2/playlist/${playlistId}/metadata`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then((response) => response);
};
