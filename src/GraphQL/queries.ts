import { gql } from '@apollo/client';

export const GET_CHARACTERS_FILTERED_BY_NAME = gql`
  query getCharactersFilteredByName($name: String!, $page: Int!) {
    characters(page: $page, filter: { name: $name }) {
      info {
        next
      }
      results {
        id
        image
        name
        status
        species
        gender
        location {
          name
        }
        episode {
          name
        }
      }
    }
  }
`;
