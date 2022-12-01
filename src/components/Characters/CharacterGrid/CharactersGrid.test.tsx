import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import CharacterGrid from './CharactersGrid';
import { mockCharacters } from './../../../__mocks__/characters.mock';
import { Box, CssBaseline } from '@mui/material';

const characters = mockCharacters.characters.results.map(character => ({
  character,
}));

const renderComponent = (
  characters: any,
  isItemLoaded: any,
  loadMoreItems: any,
) => (
  <div
    style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <CharacterGrid
      gridItems={characters}
      isItemLoaded={isItemLoaded}
      loadMoreItems={loadMoreItems}
      hasMore={false}
    />
  </div>
);

Object.defineProperties(window.HTMLElement.prototype, {
  offsetLeft: {
    get: function () {
      return parseFloat(window.getComputedStyle(this).marginLeft) || 0;
    },
  },
  offsetTop: {
    get: function () {
      return parseFloat(window.getComputedStyle(this).marginTop) || 0;
    },
  },
  offsetHeight: {
    get: function () {
      return parseFloat(window.getComputedStyle(this).height) || 1080;
    },
  },
  offsetWidth: {
    get: function () {
      return parseFloat(window.getComputedStyle(this).width) || 1920;
    },
  },
});

describe('CharacterGrid', () => {
  it('matches snapshot with data', () => {
    const isItemLoaded = jest.fn();
    const loadMoreItems = jest.fn();
    const rendered = render(
      renderComponent(characters, isItemLoaded, loadMoreItems),
    );

    expect(rendered).toMatchSnapshot();
  });

  it('matches snapshot with no data', () => {
    const isItemLoaded = jest.fn();
    const loadMoreItems = jest.fn();
    const rendered = render(
      renderComponent(characters, isItemLoaded, loadMoreItems),
    );

    expect(rendered).toMatchSnapshot();
  });

  it('matches snapshot with null data', () => {
    const isItemLoaded = jest.fn();
    const loadMoreItems = jest.fn();
    const rendered = render(
      renderComponent(characters, isItemLoaded, loadMoreItems),
    );

    expect(rendered).toMatchSnapshot();
  });

  it('calls isItemLoaded when user scrolls', () => {
    const isItemLoaded = jest.fn();
    const loadMoreItems = jest.fn();
    const rendered = render(
      renderComponent(characters, isItemLoaded, loadMoreItems),
    );

    const grid = rendered.container.querySelector('.virtual-grid>div');
    grid!.dispatchEvent(new Event('scroll'));

    expect(isItemLoaded).toHaveBeenCalled();
  });

  it('calls loadMoreItems when user scrolls', () => {
    const isItemLoaded = jest.fn();
    const loadMoreItems = jest.fn();
    const rendered = render(
      renderComponent(characters, isItemLoaded, loadMoreItems),
    );

    const grid = rendered.container.querySelector('.virtual-grid>div');
    grid!.dispatchEvent(new Event('scroll'));
    expect(loadMoreItems).toHaveBeenCalled();
  });
});
