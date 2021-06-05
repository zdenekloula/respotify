import React, { useMemo, useContext, useState, createContext } from 'react';

type SpotifyPlaybackSDKContextType = {
  player: Spotify.Player | undefined;
  setPlayer: React.Dispatch<React.SetStateAction<Spotify.Player | undefined>>;
};

const SpotifyPlaybackSDKContext = createContext<SpotifyPlaybackSDKContextType | undefined>(
  // eslint-disable-next-line unicorn/no-useless-undefined
  undefined
);
const SpotifyPlaybackSDKProvider: React.FC = ({ children }) => {
  const [player, setPlayer] = useState<Spotify.Player | undefined>();

  const values = useMemo(() => {
    return {
      player,
      setPlayer,
    };
  }, [player]);

  return (
    <SpotifyPlaybackSDKContext.Provider value={values}>
      {children}
    </SpotifyPlaybackSDKContext.Provider>
  );
};

function useSpotifyPlaybackSDK() {
  const context = useContext(SpotifyPlaybackSDKContext);
  if (context === undefined) {
    throw new Error('useSpotifyPlaybackSDK must be used within a SpotifyPlaybackSDKProvider');
  }
  return context;
}

export { useSpotifyPlaybackSDK, SpotifyPlaybackSDKProvider };
