import { SxProps } from '@mui/material';
export const CHARACTER_CARD_WIDTH = 255;
export const CHARACTER_CARD_HEIGHT = 495;
const CharacterStyles: Record<string, SxProps> = {
  card: {
    width: CHARACTER_CARD_WIDTH + 'px',
    height: CHARACTER_CARD_HEIGHT + 'px',
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
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    display: '-webkit-box',
    //hover
    '&:hover': {
      overflowY: 'auto',
      textOverflow: 'unset',
    },
  },
};

export default CharacterStyles;
