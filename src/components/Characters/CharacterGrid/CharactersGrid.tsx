import VirtualGrid from '../../common/VirtualGrid';
import { CharacterCardProps } from '../CharacterCard/CharacterCard';
import CharacterCard from '../CharacterCard';
import Box from '@mui/material/Box';

import styles from './styles';

interface ICharactersGrid {
  gridItems: CharacterCardProps[] | null;
  isItemLoaded: ({ index }: { index: number }) => boolean;
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
  isItemLoaded,
  loadMoreItems,
  gridItems,
  hasMore,
}: ICharactersGrid) => {
  return (
    <Box sx={styles.container}>
      <VirtualGrid
        items={gridItems}
        ItemCard={CharacterCard}
        itemHeight={495}
        itemWidth={255}
        gap={25}
        loadMoreItems={loadMoreItems}
        isItemLoaded={isItemLoaded}
        hasMore={hasMore}
        numberOfSkeletonsCard={4}
      />
    </Box>
  );
};

export default CharactersGrid;
