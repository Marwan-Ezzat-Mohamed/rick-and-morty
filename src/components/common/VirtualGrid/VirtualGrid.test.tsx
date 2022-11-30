import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import VirtualGrid from './VirtualGrid';
import { mockCharacters } from './../../../__mocks__/characters.mock';

const testData = Array.from({ length: 1000 }, (_, i) => ({
  index: i,
}));
const TestItem = ({ index }: { index: number }) => {
  return <div>{index}</div>;
};

describe('VirtualGrid', () => {
  it('matches snapshot with data', () => {
    const isItemLoaded = jest.fn();
    const loadMoreItems = jest.fn();
    const rendered = render(
      <VirtualGrid
        items={testData}
        ItemCard={TestItem}
        itemHeight={480}
        itemWidth={255}
        gap={25}
        loadMoreItems={loadMoreItems}
        isItemLoaded={isItemLoaded}
        hasMore={false}
      />,
    );

    expect(rendered).toMatchSnapshot();
  });

  it('matches snapshot with no data', () => {
    const isItemLoaded = jest.fn();
    const loadMoreItems = jest.fn();
    const rendered = render(
      <VirtualGrid
        items={[]}
        ItemCard={TestItem}
        itemHeight={495}
        itemWidth={255}
        gap={25}
        loadMoreItems={loadMoreItems}
        isItemLoaded={isItemLoaded}
        hasMore={false}
      />,
    );

    expect(rendered).toMatchSnapshot();
  });

  it('matches snapshot with null data', () => {
    const isItemLoaded = jest.fn();
    const loadMoreItems = jest.fn();
    const rendered = render(
      <VirtualGrid
        items={null}
        ItemCard={TestItem}
        itemHeight={495}
        itemWidth={255}
        gap={25}
        loadMoreItems={loadMoreItems}
        isItemLoaded={isItemLoaded}
        hasMore={false}
      />,
    );

    expect(rendered).toMatchSnapshot();
  });
});
