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
  isLoading: boolean;
  numberOfSkeletonsRows?: number;
};

const VirtualGrid = <Item,>({
  items,
  ItemCard,
  itemHeight,
  itemWidth,
  loadMoreItems,
  isItemLoaded,
  isLoading,
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
        const totalNumberOfCards = items?.length ?? 0;
        numberOfColumns.current = Math.max(
          Math.floor(width / (itemWidth + gap)),
          1,
        );
        const numberOfRows = Math.ceil(
          totalNumberOfCards / numberOfColumns.current,
        );

        return (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={totalNumberOfCards}
            loadMoreItems={loadMoreItems}
            threshold={1}
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
                  rowCount={numberOfRows + numberOfSkeletonsRows}
                  rowHeight={itemHeight + gap}
                  ref={ref}
                  width={width}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'absolute',
                    paddingTop: gap + 'px',
                  }}
                  className="virtual-grid"
                  onItemsRendered={gridProps => {
                    onItemsRendered({
                      overscanStartIndex:
                        gridProps.overscanRowStartIndex *
                        numberOfColumns.current,
                      overscanStopIndex:
                        gridProps.overscanRowStopIndex *
                        numberOfColumns.current,
                      visibleStartIndex:
                        gridProps.visibleRowStartIndex *
                        numberOfColumns.current,
                      visibleStopIndex:
                        gridProps.visibleRowStopIndex * numberOfColumns.current,
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
