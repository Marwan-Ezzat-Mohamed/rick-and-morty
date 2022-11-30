import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import CharacterGrid from './CharactersGrid';
import { mockCharacters } from './../../../__mocks__/characters.mock';

const characters = mockCharacters.characters.results.map(character => ({
  character,
}));

describe('CharacterGrid', () => {
  it('matches snapshot with data', () => {
    const isItemLoaded = jest.fn();
    const loadMoreItems = jest.fn();
    const rendered = render(
      <CharacterGrid
        gridItems={characters}
        isItemLoaded={isItemLoaded}
        loadMoreItems={loadMoreItems}
        hasMore={true}
      />,
    );

    expect(rendered).toMatchSnapshot();
  });

  it('matches snapshot with no data', () => {
    const isItemLoaded = jest.fn();
    const loadMoreItems = jest.fn();
    const rendered = render(
      <CharacterGrid
        gridItems={[]}
        isItemLoaded={isItemLoaded}
        loadMoreItems={loadMoreItems}
        hasMore={true}
      />,
    );

    expect(rendered).toMatchSnapshot();
  });

  it('matches snapshot with null data', () => {
    const isItemLoaded = jest.fn();
    const loadMoreItems = jest.fn();
    const rendered = render(
      <CharacterGrid
        gridItems={null}
        isItemLoaded={isItemLoaded}
        loadMoreItems={loadMoreItems}
        hasMore={true}
      />,
    );

    expect(rendered).toMatchSnapshot();
  });

  it('calls isItemLoaded when user scrolls', () => {
    const isItemLoaded = jest.fn();
    const loadMoreItems = jest.fn();
    const rendered = render(
      <CharacterGrid
        gridItems={characters}
        isItemLoaded={isItemLoaded}
        loadMoreItems={loadMoreItems}
        hasMore={true}
      />,
    );

    const grid = rendered.container.querySelector('.virtual-grid>div');
    grid!.dispatchEvent(new Event('scroll'));

    expect(isItemLoaded).toHaveBeenCalled();
  });

  it('calls loadMoreItems when user scrolls', () => {
    const isItemLoaded = jest.fn();
    const loadMoreItems = jest.fn();
    const rendered = render(
      <CharacterGrid
        gridItems={characters}
        isItemLoaded={isItemLoaded}
        loadMoreItems={loadMoreItems}
        hasMore={true}
      />,
    );

    const grid = rendered.container.querySelector('.virtual-grid>div');
    grid!.dispatchEvent(new Event('scroll'));
    expect(loadMoreItems).toHaveBeenCalled();
  });
});
