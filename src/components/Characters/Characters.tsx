import { useEffect, useRef, useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_CHARACTERS_FILTERED_BY_NAME } from '../../GraphQL/queries';
import { GetCharactersResponse } from '../../GraphQL/types';
import { useStore } from '../../store';
import shallow from 'zustand/shallow';
import CharactersGrid from './CharacterGrid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useDebounce from '../common/useDebounce/useDebounce';

const Characters = () => {
  const nextPage = useRef(1);

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
    async (query: string, override = false) => {
      if (!nextPage.current) return; // no more pages to load

      const { data, error } = await getCharacters({
        variables: {
          page: nextPage.current,
          name: query,
        },
      });

      if (!error && data) {
        setCharacters(data.characters.results, override);
        setHasNextPage(data.characters.info.next !== null);

        nextPage.current = data.characters.info.next; // update next page
      }
    },
    [getCharacters, setCharacters, setHasNextPage],
  );

  const searchQueryDebounce = useDebounce(searchQuery, 200);
  useEffect(() => {
    nextPage.current = 1; // reset page as we are searching for a new character
    loadCharacters(searchQueryDebounce, true);
  }, [searchQueryDebounce, loadCharacters]);

  const loadMoreItems = useCallback(async () => {
    await loadCharacters(searchQuery);
  }, [loadCharacters, searchQuery]);

  if (error)
    return (
      <Typography variant="h1" align="center">
        Error loading characters
        <Button
          variant="contained"
          onClick={() => loadCharacters(searchQuery)}
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
