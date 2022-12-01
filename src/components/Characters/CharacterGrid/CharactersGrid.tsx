import VirtualGrid from '../../common/VirtualGrid';
import { CharacterCardProps } from '../CharacterCard/CharacterCard';
import CharacterCard from '../CharacterCard';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import styles from './styles';
import Typography from '@mui/material/Typography';
import {
  CHARACTER_CARD_HEIGHT,
  CHARACTER_CARD_WIDTH,
} from '../CharacterCard/styles';

interface ICharactersGrid {
  gridItems: CharacterCardProps[] | null;
  loadMoreItems: ({
    startIndex,
    stopIndex,
  }: {
    startIndex: number;
    stopIndex: number;
  }) => Promise<void>;
  hasMore: boolean;
}

const CharactersGrid = ({
  loadMoreItems,
  gridItems,
  hasMore,
}: ICharactersGrid) => {
  return (
    <Box sx={styles.container}>
      <VirtualGrid
        items={gridItems}
        ItemCard={CharacterCard}
        itemHeight={CHARACTER_CARD_HEIGHT}
        itemWidth={CHARACTER_CARD_WIDTH}
        gap={25}
        loadMoreItems={loadMoreItems}
        hasMore={hasMore}
        numberOfSkeletonsCard={4}
        LoadingComponent={<LinearProgress color="inherit" />}
        NoResultsComponent={
          <Typography variant="h1" align="center">
            No Characters found
          </Typography>
        }
      />
    </Box>
  );
};

export default CharactersGrid;
