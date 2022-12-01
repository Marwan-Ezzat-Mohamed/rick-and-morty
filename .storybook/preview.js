import { CssBaseline, ThemeProvider } from '@mui/material';
import { useMode, ColorModeContext, themeSettings } from '../src/theme';
import MyCssBaseLine from '../src/MyCssBaseLine';
import { useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    title: 'Theme',
    description: 'Theme for your components',
    defaultValue: 'light',
    toolbar: {
      icon: 'paintbrush',
      dynamicTitle: true,
      items: [
        { value: 'light', left: '☀️', title: 'Light mode' },
        { value: 'dark', left: '🌙', title: 'Dark mode' },
      ],
    },
  },
};

const THEMES = {
  light: createTheme(themeSettings('light')),
  dark: createTheme(themeSettings('dark')),
};

// .storybook/preview.js

/* snipped for brevity */

export const withMuiTheme = (Story, context) => {
  const [, colorMode] = useMode();
  const { theme: themeKey } = context.globals;

  const theme = useMemo(() => THEMES[themeKey] || THEMES['light'], [themeKey]);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyCssBaseLine />
        <Story />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const decorators = [withMuiTheme];
