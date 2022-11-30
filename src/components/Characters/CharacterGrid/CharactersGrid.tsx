import React from 'react';
import VirtualGrid from '../../common/VirtualGrid';
import { CharacterCardProps } from '../CharacterCard/CharacterCard';
import CharacterCard from '../CharacterCard';
import Box from '@mui/material/Box';

import styles from './styles';

interface ICharactersGrid {
  gridItems: CharacterCardProps[] | null;
  isItemLoaded: (index: number) => boolean;
  loadMoreItems: (
    startIndex: number,
    stopIndex: number,
  ) => Promise<void> | void;
  isLoading: boolean;
}

const CharacterGrid = ({
  isItemLoaded,
  loadMoreItems,
  gridItems,
  isLoading,
}: ICharactersGrid) => {
  return (
    <Box sx={styles.container}>
      <VirtualGrid
        items={gridItems}
        ItemCard={CharacterCard}
        itemHeight={470}
        itemWidth={255}
        gap={20}
        loadMoreItems={loadMoreItems}
        isItemLoaded={isItemLoaded}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default CharacterGrid;
