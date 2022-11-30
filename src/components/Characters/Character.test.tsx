import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import Characters from './Characters';
import CharactersGrid from './CharacterGrid';
import { useLazyQuery } from '@apollo/client';
import { useStore } from '../../store';
import { mockCharacters } from '../../__mocks__/characters.mock';

afterEach(() => {
  jest.clearAllMocks();
});
jest.mock('./CharacterGrid');
jest.mock('@apollo/client');

jest.mock('../../store');

describe('CharactersListController', () => {
  it('renders error message when error is true', () => {
    const setCharacters = jest.fn();
    jest.mocked(useStore).mockReturnValue({
      characters: null,
      setCharacters,
      searchQuery: '',
    });
    (useLazyQuery as jest.Mock).mockReturnValue([
      jest.fn(() => ({ error: true, loading: false, data: null })),
      { error: true, loading: false, data: null },
    ]);
    const { getByText } = render(<Characters />);
    expect(getByText(/Error loading characters/i)).toBeInTheDocument();
  });

  it('renders reload button when error is true', () => {
    const setCharacters = jest.fn();
    jest.mocked(useStore).mockReturnValue({
      characters: null,
      setCharacters,
      searchQuery: '',
    });
    (useLazyQuery as jest.Mock).mockReturnValue([
      jest.fn(() => ({ error: true, loading: false, data: null })),
      { error: true, loading: false, data: null },
    ]);
    const { getByText } = render(<Characters />);
    expect(getByText(/reload/i)).toBeInTheDocument();
  });

  it('button calls refetch data when clicked', () => {
    const setCharacters = jest.fn();
    jest.mocked(useStore).mockReturnValue({
      characters: null,
      setCharacters,
      searchQuery: '',
    });
    const getCharacters = jest.fn(() => ({
      error: true,
      loading: false,
      data: null,
    }));
    (useLazyQuery as jest.Mock).mockReturnValue([
      getCharacters,
      { error: true, loading: false, data: null },
    ]);
    const component = render(<Characters />);
    const button = component.getByText(/reload/i);
    button.click();
    expect(getCharacters).toHaveBeenCalled();
  });

  it('updates the store with characters when data is returned', async () => {
    const setCharacters = jest.fn();
    jest.mocked(useStore).mockReturnValue({
      characters: null,
      setCharacters,
      searchQuery: '',
    });
    (useLazyQuery as jest.Mock).mockReturnValue([
      jest.fn(() => ({ error: false, loading: false, data: mockCharacters })),
      { error: false, loading: false, data: mockCharacters },
    ]);
    render(<Characters />);
    //wait for the data to be returned
    await waitFor(() =>
      expect(setCharacters).toHaveBeenCalledWith(
        mockCharacters.characters.results,
        true,
      ),
    );
  });

  it('sends proper query to the server when searchQuery is empty', async () => {
    const setCharacters = jest.fn();
    jest.mocked(useStore).mockReturnValue({
      characters: null,
      setCharacters,
      searchQuery: '',
    });
    const getCharacters = jest.fn(() => ({
      error: false,
      loading: false,
      data: mockCharacters,
    }));

    (useLazyQuery as jest.Mock).mockReturnValue([
      getCharacters,
      { error: false, loading: false, data: mockCharacters },
    ]);
    render(<Characters />);
    //wait for the data to be returned
    await waitFor(() =>
      expect(getCharacters).toHaveBeenCalledWith({
        variables: {
          page: 1,
          name: '',
        },
      }),
    );
  });

  it('sends proper query to the server when searchQuery is not empty', async () => {
    const setCharacters = jest.fn();
    jest.mocked(useStore).mockReturnValue({
      characters: null,
      setCharacters,
      searchQuery: 'rick',
    });
    const getCharacters = jest.fn(() => ({
      error: false,
      loading: false,
      data: mockCharacters,
    }));

    (useLazyQuery as jest.Mock).mockReturnValue([
      getCharacters,
      { error: false, loading: false, data: mockCharacters },
    ]);

    render(<Characters />);
    //wait for the data to be returned
    await waitFor(() =>
      expect(getCharacters).toHaveBeenCalledWith({
        variables: {
          page: 1,
          name: 'rick',
        },
      }),
    );
  });

  it('send proper data to CharactersGrid when data is loading', async () => {
    const setCharacters = jest.fn();
    jest.mocked(useStore).mockReturnValue({
      characters: null,
      setCharacters,
      searchQuery: '',
    });
    (useLazyQuery as jest.Mock).mockReturnValue([
      jest.fn(() => ({ error: false, loading: false, data: mockCharacters })),
      { error: false, loading: false, data: mockCharacters },
    ]);
    render(<Characters />);

    expect(
      jest.mocked(CharactersGrid).mock.calls[0][0].gridItems,
    ).toStrictEqual(null);
  });

  it('send proper data to CharactersGrid when data is loaded', async () => {
    const setCharacters = jest.fn();
    jest.mocked(useStore).mockReturnValue({
      characters: mockCharacters.characters.results,
      setCharacters,
      searchQuery: '',
    });
    (useLazyQuery as jest.Mock).mockReturnValue([
      jest.fn(() => ({ error: false, loading: false, data: mockCharacters })),
      { error: false, loading: false, data: mockCharacters },
    ]);
    render(<Characters />);

    //wait for the data to be returned
    await waitFor(() =>
      expect(
        jest.mocked(CharactersGrid).mock.calls[0][0].gridItems,
      ).toStrictEqual(
        mockCharacters.characters.results.map(character => ({
          character,
        })),
      ),
    );
  });
});
