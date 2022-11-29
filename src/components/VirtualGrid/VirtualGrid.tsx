import React, { useRef } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import LinearProgress from '@mui/material/LinearProgress';
import {
  FixedSizeGrid as Grid,
  GridChildComponentProps,
  areEqual,
} from 'react-window';
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
};

const VirtualGrid = <Item,>({
  items,
  ItemCard,
  itemHeight,
  itemWidth,
  gap = 0,
  loadMoreItems,
  isItemLoaded,
}: ItemCardGridProps<Item>): JSX.Element => {
  const numberOfItemsThatFits = useRef(0);
  const getIdByGridPosition = (col: number, row: number) =>
    row * numberOfItemsThatFits.current + col;

  if (!items) return <LinearProgress color="inherit" />;
  if (items.length === 0)
    return (
      <h1
        style={{
          textAlign: 'center',
        }}
      >
        No results found
      </h1>
    );
  const Cell = React.memo(
    ({
      columnIndex,
      rowIndex,
      style,
    }: GridChildComponentProps): JSX.Element => {
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
        numberOfItemsThatFits.current = Math.max(
          Math.floor(width / (itemWidth + gap)),
          1,
        );
        return (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={(items?.length ?? 0) + 10}
            loadMoreItems={loadMoreItems}
            threshold={5}
          >
            {({ onItemsRendered, ref }) => {
              return (
                <Grid
                  columnCount={Math.min(
                    numberOfItemsThatFits.current,
                    (items?.length ?? 0) + 10,
                  )}
                  columnWidth={itemWidth + gap}
                  height={height}
                  rowCount={
                    ((items?.length ?? 0) + 10) / numberOfItemsThatFits.current
                  }
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
                        numberOfItemsThatFits.current,
                      overscanStopIndex:
                        gridProps.overscanRowStopIndex *
                        numberOfItemsThatFits.current,
                      visibleStartIndex:
                        gridProps.visibleRowStartIndex *
                        numberOfItemsThatFits.current,
                      visibleStopIndex:
                        gridProps.visibleRowStopIndex *
                        numberOfItemsThatFits.current,
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
