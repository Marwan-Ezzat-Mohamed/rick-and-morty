import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { tokens } from './../../../theme';
import styles from './styles';
import { memo } from 'react';

const CharacterCardSkeleton = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const Information = () => {
    return (
      <Box>
        <Box
          sx={{
            display: 'flex',
            color: '#8f949f',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" width="40%">
            <Skeleton />
          </Typography>
        </Box>
        <Typography variant="h5">
          <Skeleton />
        </Typography>
      </Box>
    );
  };

  return (
    <Card
      sx={{
        ...styles.card,
        backgroundColor: colors.primary[400],
        '&:hover': {
          backgroundColor: colors.primary[500],
          transform: 'scale(1.05)',
        },
      }}
    >
      <Skeleton variant="rectangular" sx={styles.media} />
      <CardContent sx={styles.content}>
        <Typography variant="h3" fontWeight="bold">
          <Skeleton />
        </Typography>

        {Information()}
        {Information()}
        {Information()}
      </CardContent>
    </Card>
  );
};

export default memo(CharacterCardSkeleton);
