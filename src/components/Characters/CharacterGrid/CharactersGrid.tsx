import React from 'react';
import VirtualGrid from '../../VirtualGrid';
import { CharacterCardProps } from '../CharacterCard/CharacterCard';
import CharacterCard from '../CharacterCard';
import Box from '@mui/material/Box';

import styles from './styles';

interface ICharactersGrid {
  data: CharacterCardProps[] | null;
  isItemLoaded: (index: number) => boolean;
  loadMoreItems: (
    startIndex: number,
    stopIndex: number,
  ) => Promise<void> | void;
}

const CharacterGrid = ({
  isItemLoaded,
  loadMoreItems,
  data,
}: ICharactersGrid) => {
  return (
    <Box sx={styles.container}>
      <VirtualGrid
        items={data}
        ItemCard={CharacterCard}
        itemHeight={470}
        itemWidth={255}
        gap={20}
        loadMoreItems={loadMoreItems}
        isItemLoaded={isItemLoaded}
      />
    </Box>
  );
};

export default CharacterGrid;
