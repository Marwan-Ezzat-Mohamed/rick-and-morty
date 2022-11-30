import React, { useRef, useCallback } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import LinearProgress from '@mui/material/LinearProgress';
import {
  FixedSizeGrid as Grid,
  GridChildComponentProps,
  areEqual,
} from 'react-window';
import Typography from '@mui/material/Typography';
import './styles.css';

type ItemCardGridProps<Item> = {
  items: Item[] | null;
  ItemCard: React.FC<Item>;
  itemHeight: number;
  itemWidth: number;
  gap?: number;
  loadMoreItems: (
    startIndex: number,
    stopIndex: number,
  ) => Promise<void> | void;
  isItemLoaded: (index: number) => boolean;
  hasMore: boolean;
  numberOfSkeletonsRows?: number;
};

const VirtualGrid = <Item,>({
  items,
  ItemCard,
  itemHeight,
  itemWidth,
  loadMoreItems,
  isItemLoaded,
  hasMore,
  gap = 0,
  numberOfSkeletonsRows = 1,
}: ItemCardGridProps<Item>): JSX.Element => {
  const numberOfColumns = useRef(0);
  const getIdByGridPosition = useCallback(
    (col: number, row: number) => row * numberOfColumns.current + col,
    [],
  );

  if (!items) return <LinearProgress color="inherit" />;

  if (items.length === 0) {
    return (
      <Typography align="center" variant="h1">
        No results found
      </Typography>
    );
  }

  const Cell = React.memo(
    ({
      columnIndex,
      rowIndex,
      style,
    }: GridChildComponentProps): JSX.Element | null => {
      const index = getIdByGridPosition(columnIndex, rowIndex);
      if (!hasMore && index >= items.length) return null;
      return (
        <div style={style}>
          <ItemCard {...items[index]} style={{}} />
        </div>
      );
    },
    areEqual,
  );

  return (
    <AutoSizer>
      {({ height, width }) => {
        const totalNumberOfCards = (items?.length ?? 0) + (hasMore ? 1 : 0);
        numberOfColumns.current = Math.max(
          Math.floor(width / (itemWidth + gap)),
          1,
        );
        const numberOfRows =
          Math.ceil(totalNumberOfCards / numberOfColumns.current) +
          (hasMore ? numberOfSkeletonsRows : 0);

        return (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={totalNumberOfCards}
            loadMoreItems={loadMoreItems}
          >
            {({ onItemsRendered, ref }) => {
              return (
                <Grid
                  columnCount={Math.min(
                    numberOfColumns.current,
                    totalNumberOfCards,
                  )}
                  columnWidth={itemWidth + gap}
                  height={height}
                  rowCount={numberOfRows}
                  rowHeight={itemHeight + gap}
                  ref={ref}
                  width={width}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'absolute',
                    marginTop: gap + 'px',
                  }}
                  className="virtual-grid"
                  onItemsRendered={({
                    visibleRowStartIndex,
                    visibleColumnStartIndex,
                    visibleRowStopIndex,
                    overscanRowStopIndex,
                    overscanRowStartIndex,
                  }) => {
                    onItemsRendered({
                      overscanStartIndex:
                        overscanRowStartIndex * numberOfColumns.current,
                      overscanStopIndex:
                        overscanRowStopIndex * numberOfColumns.current,
                      visibleStartIndex:
                        visibleRowStartIndex * numberOfColumns.current,
                      visibleStopIndex:
                        visibleRowStopIndex * numberOfColumns.current,
                    });
                  }}
                >
                  {Cell}
                </Grid>
              );
            }}
          </InfiniteLoader>
        );
      }}
    </AutoSizer>
  );
};

export default VirtualGrid;
