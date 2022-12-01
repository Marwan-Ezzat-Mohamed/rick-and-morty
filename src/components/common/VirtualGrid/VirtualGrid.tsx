import { useRef, useMemo } from 'react';
import {
  List as _List,
  ListProps,
  InfiniteLoaderProps,
  InfiniteLoader as _InfiniteLoader,
  AutoSizer as _AutoSizer,
  AutoSizerProps,
  IndexRange,
  Index,
} from 'react-virtualized';

const List = _List as unknown as React.FC<ListProps>;
const InfiniteLoader =
  _InfiniteLoader as unknown as React.FC<InfiniteLoaderProps>;
const AutoSizer = _AutoSizer as unknown as React.FC<AutoSizerProps>;

interface VirtualGridProps<ItemType> {
  items: ItemType[] | null;
  ItemCard: React.FC<ItemType>;
  renderItem?: null | ((item: ItemType) => React.ReactNode);
  isItemLoaded: (index: Index) => boolean;
  loadMoreItems: (index: IndexRange) => Promise<void>;
  itemHeight: number;
  itemWidth: number;
  className?: string;
  style?: React.CSSProperties;
  gap?: number;
  hasMore: boolean;
  numberOfSkeletonsCard?: number;
  LoadingComponent?: JSX.Element | null;
  NoResultsComponent?: JSX.Element | null;
}

const VirtualGrid = <ItemType,>({
  items,
  renderItem = null,
  ItemCard,
  itemHeight,
  itemWidth,
  gap = 0,
  className,
  style,
  isItemLoaded,
  loadMoreItems,
  hasMore,
  numberOfSkeletonsCard = 1,
  LoadingComponent = null,
  NoResultsComponent = null,
  ...rest
}: VirtualGridProps<ItemType>) => {
  const itemsPerRow = useRef(0);
  const totalNumberOfItems =
    (items?.length ?? 0) + (hasMore ? numberOfSkeletonsCard : 0);

  const rowRenderer = ({ index, key, style }: any) => {
    const itemsToRenderPerRow = [];
    const fromIndex = index * itemsPerRow.current;
    const toIndex = Math.min(
      fromIndex + itemsPerRow.current,
      totalNumberOfItems,
    );

    for (let i = fromIndex; i < toIndex; i++) {
      itemsToRenderPerRow.push(
        <div
          style={{
            width: itemWidth + gap + 'px',
            height: itemHeight + gap + 'px',
          }}
          key={key + i}
        >
          {renderItem ? (
            renderItem(items![i])
          ) : (
            <ItemCard {...items![i]} style={{}} />
          )}
        </div>,
      );
    }

    return (
      <div
        key={key}
        style={{
          ...style,
          display: 'flex',
          justifyContent: 'center',
          top: style.top + 10,
        }}
      >
        {itemsToRenderPerRow}
      </div>
    );
  };

  const memoizedValue = useMemo(() => rowRenderer, [items]);

  if (!items) {
    if (LoadingComponent) return LoadingComponent;
    return <h1>Loading...</h1>;
  }

  if (items.length === 0) {
    if (NoResultsComponent) return NoResultsComponent;
    return (
      <h1
        style={{
          textAlign: 'center',
        }}
      >
        No results found
      </h1>
    );
  }

  return (
    <AutoSizer>
      {({ height, width }) => {
        itemsPerRow.current = Math.floor(width / (itemWidth + gap));
        return (
          <InfiniteLoader
            isRowLoaded={({ index }) =>
              isItemLoaded({ index: index * itemsPerRow.current })
            }
            rowCount={totalNumberOfItems}
            loadMoreRows={loadMoreItems}
            threshold={1}
          >
            {({ registerChild, onRowsRendered }) => {
              return (
                <List
                  className={className + ' virtual-grid'}
                  style={style}
                  height={height}
                  width={width}
                  rowHeight={itemHeight + gap}
                  rowRenderer={memoizedValue}
                  rowCount={Math.ceil(totalNumberOfItems / itemsPerRow.current)}
                  ref={registerChild}
                  itemData={items}
                  onRowsRendered={onRowsRendered}
                />
              );
            }}
          </InfiniteLoader>
        );
      }}
    </AutoSizer>
  );
};

export default VirtualGrid;
