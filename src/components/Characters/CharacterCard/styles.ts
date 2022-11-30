import { SxProps } from '@mui/material';

const CharacterStyles: Record<string, SxProps> = {
  card: {
    width: '255px',
    height: '495px',
    p: 2,
    borderRadius: '20px',
    boxShadow: 6,
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    height: '215px',
    borderRadius: '0.7rem',
    boxShadow: 5,
    cursor: 'pointer',
  },
  content: {
    p: 0,
    paddingY: '0px !important',
    mt: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  status: {
    height: '0.65rem',
    width: '0.65rem',
    borderRadius: '50%',
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
    p: 0,
  },

  infoText: {
    lineHeight: '1.3',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',
    display: '-webkit-box',
    //hover
    '&:hover': {
      overflowY: 'auto',
      textOverflow: 'unset',
    },
  },
};

export default CharacterStyles;
