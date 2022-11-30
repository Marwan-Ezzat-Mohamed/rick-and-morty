import { useEffect, useRef, useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_CHARACTERS_FILTERED_BY_NAME } from '../../GraphQL/queries';
import { GetCharactersResponse } from '../../GraphQL/types';
import { useStore } from '../../store';
import shallow from 'zustand/shallow';
import useDebounce from './../common/useDebounce';
import CharacterGrid from './CharacterGrid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Characters = () => {
  const nextPage = useRef(1);
  const currentLoading = useRef<number | null>(null);

  const { characters, setCharacters, searchQuery } = useStore(
    state => ({
      characters: state.characters,
      setCharacters: state.setCharacters,
      searchQuery: state.searchQuery,
    }),
    shallow,
  );

  const [getCharacters, { error, loading }] =
    useLazyQuery<GetCharactersResponse>(GET_CHARACTERS_FILTERED_BY_NAME, {
      variables: {
        page: 1,
        name: searchQuery,
      },
    });

  const loadCharacters = useCallback(
    async (query: string, override = false) => {
      if (!nextPage.current || currentLoading.current === nextPage.current)
        return; // no more pages to load

      currentLoading.current = nextPage.current;
      const { data, error } = await getCharacters({
        variables: {
          page: nextPage.current,
          name: query,
        },
      });
      currentLoading.current = null;
      if (!error && data) {
        setCharacters(data.characters.results, override);
        nextPage.current = data.characters.info.next; // update next page
      }
    },
    [getCharacters, setCharacters],
  );

  const searchQueryDebounce = useDebounce(searchQuery, 100);
  useEffect(() => {
    nextPage.current = 1; // reset page as we are searching for a new character
    loadCharacters(searchQueryDebounce, true);
  }, [searchQueryDebounce, loadCharacters]);

  const isItemLoaded = useCallback(
    (index: number) => {
      return !(characters && characters[index] && characters[index].id);
    },
    [characters],
  );

  const loadMoreItems = useCallback(
    async (startIndex: number, stopIndex: number) => {
      console.log({ startIndex, stopIndex, len: characters?.length });
      if (!characters) return;
      if (stopIndex < characters.length - 1 || !nextPage.current) return;
      await loadCharacters(searchQueryDebounce);
    },
    [characters, loadCharacters, searchQueryDebounce],
  );

  if (error)
    return (
      <Typography variant="h1" align="center">
        Error loading characters
        <Button
          variant="contained"
          onClick={() => loadCharacters(searchQueryDebounce)}
          color="warning"
          sx={{ mx: 2 }}
        >
          reload
        </Button>
      </Typography>
    );

  return (
    <CharacterGrid
      isItemLoaded={isItemLoaded}
      loadMoreItems={loadMoreItems}
      gridItems={
        characters ? characters.map(character => ({ character })) : null
      }
      hasMore={nextPage.current != null}
    />
  );
};

export default Characters;
