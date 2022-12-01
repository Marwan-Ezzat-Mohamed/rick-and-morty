import { useEffect, useRef, useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_CHARACTERS_FILTERED_BY_NAME } from '../../GraphQL/queries';
import { GetCharactersResponse } from '../../GraphQL/types';
import { useStore } from '../../store';
import shallow from 'zustand/shallow';
import useDebounce from '../common/useDebounce/useDebounce';
import CharactersGrid from './CharacterGrid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Characters = () => {
  const nextPage = useRef(1);
  const currentLoading = useRef<number | null>(null);

  const {
    characters,
    setCharacters,
    searchQuery,
    hasNextPage,
    setHasNextPage,
  } = useStore(
    state => ({
      characters: state.characters,
      setCharacters: state.setCharacters,
      searchQuery: state.searchQuery,
      hasNextPage: state.hasNextPage,
      setHasNextPage: state.setHasNextPage,
    }),
    shallow,
  );

  const [getCharacters, { error }] = useLazyQuery<GetCharactersResponse>(
    GET_CHARACTERS_FILTERED_BY_NAME,
    {
      variables: {
        page: 1,
        name: searchQuery,
      },
    },
  );

  const loadCharacters = useCallback(
    async (override = false) => {
      if (!nextPage.current || currentLoading.current === nextPage.current)
        return; // no more pages to load

      currentLoading.current = nextPage.current;
      const { data, error } = await getCharacters({
        variables: {
          page: nextPage.current,
          name: searchQuery,
        },
      });
      currentLoading.current = null;
      if (!error && data) {
        setCharacters(data.characters.results, override);
        setHasNextPage(data.characters.info.next !== null);

        nextPage.current = data.characters.info.next; // update next page
      }
    },
    [getCharacters, setCharacters, setHasNextPage, searchQuery],
  );

  const searchQueryDebounce = useDebounce(searchQuery, 100);
  useEffect(() => {
    nextPage.current = 1; // reset page as we are searching for a new character
    loadCharacters(true);
  }, [searchQueryDebounce, loadCharacters]);

  const loadMoreItems = useCallback(async () => {
    await loadCharacters();
  }, [loadCharacters]);

  if (error)
    return (
      <Typography variant="h1" align="center">
        Error loading characters
        <Button
          variant="contained"
          onClick={() => loadCharacters()}
          color="warning"
          sx={{ mx: 2 }}
        >
          Reload
        </Button>
      </Typography>
    );

  return (
    <CharactersGrid
      loadMoreItems={loadMoreItems}
      gridItems={
        characters ? characters.map(character => ({ character })) : null
      }
      hasMore={hasNextPage}
    />
  );
};

export default Characters;
