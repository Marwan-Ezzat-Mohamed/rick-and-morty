import { SxProps } from '@mui/material';

const TopBarStyles: Record<string, SxProps> = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    width: '100%',
    p: 2,
  },
  searchContainer: {
    borderRadius: '3px',
    display: 'flex',
    flex: 1,
    boxShadow: 1,
  },
  searchInput: {
    flex: 1,
    ml: 2,
  },
  themeSwitcher: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default TopBarStyles;
