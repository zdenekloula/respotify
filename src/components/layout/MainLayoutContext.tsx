import React, { useMemo, useContext, useState, createContext } from 'react';

type LayoutContextType = {
  topbar: HTMLDivElement | null;
  mainView: HTMLDivElement | null;
  setTopbar: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
  setMainView: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
};

// eslint-disable-next-line unicorn/no-useless-undefined
const LayoutContext = createContext<LayoutContextType | undefined>(undefined);
const LayoutProvider: React.FC = ({ children }) => {
  const [topbar, setTopbar] = useState<HTMLDivElement | null>(null);
  const [mainView, setMainView] = useState<HTMLDivElement | null>(null);

  const values = useMemo(() => {
    return {
      topbar,
      mainView,
      setMainView,
      setTopbar,
    };
  }, [topbar, mainView]);

  return <LayoutContext.Provider value={values}>{children}</LayoutContext.Provider>;
};

function useLayout() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a LayoutProvider');
  }
  return context;
}

export { useLayout, LayoutProvider };
