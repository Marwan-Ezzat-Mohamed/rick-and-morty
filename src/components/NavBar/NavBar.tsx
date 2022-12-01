import { Box, IconButton, useTheme } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext, getTokens } from '../../Theme/theme';
import InputBase from '@mui/material/InputBase';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import styles from './styles';
import { useStore } from '../../store';
import shallow from 'zustand/shallow';

const NavBar = () => {
  const { searchQuery, setSearchQuery } = useStore(
    state => ({
      searchQuery: state.searchQuery,
      setSearchQuery: state.setSearchQuery,
    }),
    shallow,
  );
  const theme = useTheme();
  const colors = getTokens(theme.palette.mode);
  const toggleTheme = useContext(ColorModeContext);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Box sx={styles.container}>
      {/* SEARCH BAR */}
      <Box
        sx={{
          ...styles.searchContainer,
          backgroundColor: colors.primary[400],
        }}
      >
        <InputBase
          sx={styles.searchInput}
          placeholder="Search for characters"
          value={searchQuery}
          onChange={handleSearch}
        />
        <IconButton type="button">
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box sx={styles.themeSwitcher}>
        <IconButton onClick={toggleTheme}>
          {theme.palette.mode === 'dark' ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default NavBar;
