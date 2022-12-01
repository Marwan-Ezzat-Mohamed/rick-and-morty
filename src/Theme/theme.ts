import { createContext, useState, useMemo, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import { Theme, PaletteMode } from '@mui/material';

import { darkPalette, lightPalette } from './colorPalettes';

// color design tokens export
export const getTokens = (mode: PaletteMode) => ({
  ...(mode === 'dark' ? darkPalette : lightPalette),
});

// mui theme settings
export const themeSettings = (mode: PaletteMode) => {
  const colors = getTokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: '#fcfcfc',
            },
          }),
    },
    typography: {
      fontFamily: ['Arial'].join(','),
      fontSize: 12,
      h1: {
        fontFamily: ['Arial'].join(','),
        fontSize: 40,
      },
      h2: {
        fontFamily: ['Arial'].join(','),
        fontSize: 32,
      },
      h3: {
        fontFamily: ['Arial'].join(','),
        fontSize: 24,
      },
      h4: {
        fontFamily: ['Arial'].join(','),
        fontSize: 20,
      },
      h5: {
        fontFamily: ['Arial'].join(','),
        fontSize: 16,
      },
      h6: {
        fontFamily: ['Arial'].join(','),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext<() => void>(() => {});

export const useMode = (): [Theme, () => void] => {
  const [mode, setMode] = useState<PaletteMode>('light');

  useEffect(() => {
    const localMode = window.localStorage.getItem('theme');
    const systemMode = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    if (localMode) {
      //check if the mode is valid
      const isValidMode = ['dark', 'light'].includes(localMode);
      if (isValidMode) {
        setMode(localMode as PaletteMode);
        return;
      }
    }
    // if the mode is not set in local storage, use the system mode
    setMode(systemMode);
  }, []);

  const toggleColorMode = () => {
    setMode(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      return next;
    });
  };

  const toggleTheme = useMemo(() => toggleColorMode, []);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, toggleTheme];
};
