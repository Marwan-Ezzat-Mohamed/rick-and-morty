import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import NavBar from './components/NavBar';
import { ColorModeContext, useMode } from './theme';
import Characters from './components/Characters';
import MyCssBaseLine from './MyCssBaseLine';

const App = (): JSX.Element => {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyCssBaseLine />
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <NavBar />

          <Characters />
          {/* <Tat /> */}
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
