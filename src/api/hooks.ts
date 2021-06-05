import { useInfiniteQuery, useQuery } from 'react-query';
import { authenticatedFetch } from './common';
import { getAlbum } from './getAlbum';
import { getArtist } from './getArtist';
import { getArtistAlbums } from './getArtistAlbums';
import { getArtistRelatedArtists } from './getArtistRelatedArtists';
import { getArtistTopTracks } from './getArtistTopTracks';
import { getFeaturedPlaylists } from './getFeaturedPlaylists';
import { getMePlaylists, ListOfCurrentUsersPlaylistsParameters } from './getMePlaylists';
import { getNewReleases } from './getNewReleases';
import { getPlaylist } from './getPlaylist';
import type { PlaylistMetadataResponse } from './getPlaylistMetadata';
import { getPlaylistTracks } from './getPlaylistTracks';
import { getRecentlyPlayedTracks } from './getRecentlyPlayedTracks';
import type { ArtistOverviewResponse } from './graphql/artistOverviewQuery';
import type { PagingParameters } from './types';

/* GET /me/playlists */
export const useMePlaylistsQuery = (
  queryParameters: ListOfCurrentUsersPlaylistsParameters = {}
) => {
  return useQuery<SpotifyApi.ListOfCurrentUsersPlaylistsResponse, Error>(['me', 'playlists'], () =>
    getMePlaylists(queryParameters)
  );
};

/* GET /playlists/:id */
export const usePlaylistQuery = (playlistId: string) => {
  return useQuery<SpotifyApi.SinglePlaylistResponse, Error>(['playlist', playlistId], () =>
    getPlaylist(playlistId)
  );
};

export const usePlaylistMetadataQuery = (playlistId: string) => {
  return useQuery<PlaylistMetadataResponse, Error>(['playlist', 'metadata', playlistId], () =>
    authenticatedFetch(`/api/get-playlist-metadata?id=${playlistId}`).then((r) => r.json())
  );
};

/* GET /playlists/:id */
export const usePlaylistTracksInfiniteQuery = (playlistId: string) => {
  return useInfiniteQuery<SpotifyApi.PlaylistTrackResponse, Error>(
    ['playlist', playlistId, 'tracks'],
    ({ pageParam: pageParameter = 0 }) => {
      return getPlaylistTracks(playlistId, {
        offset: pageParameter,
      });
    },
    {
      getNextPageParam: (lastPage) => {
        const offset = lastPage.offset + lastPage.limit;
        return lastPage.next ? offset : undefined;
      },
    }
  );
};

export const useRecentlyPlayedTracksQuery = (
  queryParameters: SpotifyApi.RecentlyPlayedParameterObject = {}
) => {
  return useQuery<SpotifyApi.UsersRecentlyPlayedTracksResponse, Error>(
    ['me', 'recently-played-tracks'],
    () => getRecentlyPlayedTracks(queryParameters)
  );
};

/* GET /browse/new-releases */
export const useNewReleasesQuery = (queryParameters: PagingParameters = {}) => {
  return useQuery<SpotifyApi.ListOfNewReleasesResponse, Error>(['browse', 'new-releases'], () =>
    getNewReleases(queryParameters)
  );
};

/* GET /browse/featured-playlists */
export const useFeaturedPlaylistsQuery = (queryParameters: PagingParameters = {}) => {
  return useQuery<SpotifyApi.ListOfFeaturedPlaylistsResponse, Error>(
    ['browse', 'featured-playlists'],
    () => getFeaturedPlaylists(queryParameters)
  );
};

/* GET /playlists/:id */
export const useMePlaylistsInfiniteQuery = () => {
  return useInfiniteQuery<SpotifyApi.ListOfCurrentUsersPlaylistsResponse, Error>(
    ['me', 'playlists'],
    ({ pageParam: pageParameter = 0 }) => {
      return getMePlaylists({
        offset: pageParameter,
      });
    },
    {
      getNextPageParam: (lastPage) => {
        const offset = lastPage.offset + lastPage.limit;
        return lastPage.next ? offset : undefined;
      },
    }
  );
};

/* GET /albums/:id */
export const useAlbumsQuery = (albumId: string) => {
  return useQuery<SpotifyApi.SingleAlbumResponse, Error>(['album', albumId], () =>
    getAlbum(albumId)
  );
};

/* GET /artists/:id/top-tracks */
export const useArtistTopTracksQuery = (artistId: string) => {
  return useQuery<SpotifyApi.ArtistsTopTracksResponse, Error>(
    ['artist', artistId, 'top-tracks'],
    () => getArtistTopTracks(artistId)
  );
};

export const useArtistMissingDataQuery = (artistId: string) => {
  return useQuery<ArtistOverviewResponse['data']['artist'], Error>(
    ['artist', artistId, 'missing-data'],
    () => authenticatedFetch(`/api/artist/${artistId}/missing-data`).then((r) => r.json())
  );
};

/* GET /artists/:id */
export const useArtistQuery = (artistId: string) => {
  return useQuery<SpotifyApi.SingleArtistResponse, Error>(['artist', artistId], () =>
    getArtist(artistId)
  );
};

/* GET /artists/:id/albums */
export const useArtistAlbumsQuery = (artistId: string) => {
  return useQuery<SpotifyApi.ArtistsAlbumsResponse, Error>(['artist', artistId, 'albums'], () =>
    getArtistAlbums(artistId)
  );
};

/* GET /artists/:id/related-artists */
export const useArtistRelatedArtistsQuery = (artistId: string) => {
  return useQuery<SpotifyApi.ArtistsRelatedArtistsResponse, Error>(
    ['artist', artistId, 'related-artists'],
    () => getArtistRelatedArtists(artistId)
  );
};
