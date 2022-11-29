import { useMemo } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import styles from './styles';
import { tokens } from './../../../theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDna,
  faLocationArrow,
  faEye,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import { Character } from '../../../GraphQL/types';
import CharacterCardSkeleton from './CharacterCardSkeleton';

export interface CharacterCardProps {
  character: Character | null;
}

const CharacterCard = ({ character }: CharacterCardProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const characterStatus: Record<string, string> = useMemo(
    () => ({
      Alive: colors.greenAccent[500],
      Dead: colors.redAccent[500],
      unknown: colors.grey[500],
    }),
    [colors],
  );

  const Information = ({
    title,
    value,
    icon,
    rotate = '0deg',
  }: {
    title: string;
    value: string;
    icon: IconDefinition;
    rotate?: string;
  }) => {
    return (
      <Box>
        <Box
          sx={{
            display: 'flex',
            color: '#8f949f',
            alignItems: 'center',
          }}
        >
          <FontAwesomeIcon
            icon={icon}
            style={{
              rotate: rotate,
              fontWeight: 'bold',
            }}
          />
          <Typography variant="h5" component="div" ml={1} fontWeight="bold">
            {title}
          </Typography>
        </Box>
        <Typography variant="h5" component="div">
          {value}
        </Typography>
      </Box>
    );
  };

  if (!character) return <CharacterCardSkeleton />;
  const { image, name, status, species, gender, location, episode } = character;

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
      <CardMedia component="img" sx={styles.media} image={image} alt={name} />
      <CardContent sx={styles.content}>
        <Typography variant="h3" component="div" fontWeight="bold">
          {name}
        </Typography>

        <Box sx={styles.statusContainer}>
          <Box
            sx={{
              ...styles.status,
              backgroundColor: characterStatus[status],
              boxShadow:
                status !== 'unknown'
                  ? `0rem 0rem 0.45rem 0.04rem ${characterStatus[status]}`
                  : '',
            }}
          />
          <Typography variant="h5" component="div" ml={1}>
            status
          </Typography>
        </Box>
        {Information({
          title: 'Species',
          value: `${species} - ${gender}`,
          icon: faDna,
          rotate: '45deg',
        })}
        {Information({
          title: 'Last known location',
          value: location.name,
          icon: faLocationArrow,
        })}
        {Information({
          title: 'First seen in',
          value: episode[0].name,
          icon: faEye,
        })}
      </CardContent>
    </Card>
  );
};

export default CharacterCard;