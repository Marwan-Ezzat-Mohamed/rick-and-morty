import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import CharacterGrid from './CharactersGrid';
import { mockCharacters } from './../../../__mocks__/characters.mock';

const characters = mockCharacters.characters.results.map(character => ({
  character,
}));

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
    const loadMoreItems = jest.fn();
    const rendered = render(
      <CharacterGrid
        gridItems={characters}
        loadMoreItems={loadMoreItems}
        hasMore={false}
      />,
    );

    expect(rendered).toMatchSnapshot();
  });

  it('matches snapshot with no data', () => {
    const loadMoreItems = jest.fn();
    const rendered = render(
      <CharacterGrid
        gridItems={characters}
        loadMoreItems={loadMoreItems}
        hasMore={false}
      />,
    );

    expect(rendered).toMatchSnapshot();
  });

  it('matches snapshot with null data', () => {
    const loadMoreItems = jest.fn();
    const rendered = render(
      <CharacterGrid
        gridItems={characters}
        loadMoreItems={loadMoreItems}
        hasMore={false}
      />,
    );

    expect(rendered).toMatchSnapshot();
  });

  it('calls loadMoreItems when user scrolls', () => {
    const loadMoreItems = jest.fn();
    const rendered = render(
      <CharacterGrid
        gridItems={characters}
        loadMoreItems={loadMoreItems}
        hasMore={false}
      />,
    );

    const grid = rendered.container.querySelector('.virtual-grid>div');
    grid!.dispatchEvent(new Event('scroll'));
    expect(loadMoreItems).toHaveBeenCalled();
  });
});
