import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import NavBar from './components/NavBar';
import { ColorModeContext, useMode } from './theme';
import Characters from './components/Characters';

const App = (): JSX.Element => {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
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
