import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import NavBar from './components/NavBar';
import { ColorModeContext, useMode } from './Theme/theme';
import Characters from './components/Characters';

const App = (): JSX.Element => {
  const [theme, toggleTheme] = useMode();
  return (
    <ColorModeContext.Provider value={toggleTheme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <NavBar />
          <Characters />
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
