import { ComponentStory, ComponentMeta } from '@storybook/react';

import CharactersGrid from '.';
import { mockCharacters } from './../../../__mocks__/characters.mock';
import { Box } from '@mui/material';

export default {
  title: 'Components/Character Grid',
  component: CharactersGrid,
} as ComponentMeta<typeof CharactersGrid>;

const Template: ComponentStory<typeof CharactersGrid> = args => (
  <Box
    sx={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <CharactersGrid {...args} />
  </Box>
);
export const Primary = Template.bind({});
Primary.args = {
  gridItems: mockCharacters.characters.results.map(character => ({
    character,
  })),
  isItemLoaded: (index: number) => true,
  loadMoreItems: (startIndex: number, stopIndex: number) => {},
  hasMore: true,
};

export const NoResults = Template.bind({});
NoResults.args = {
  gridItems: [],
  isItemLoaded: (index: number) => true,
  loadMoreItems: (startIndex: number, stopIndex: number) => {},
  hasMore: false,
};
export const Loading = Template.bind({});
Loading.args = {
  gridItems: null,
  isItemLoaded: (index: number) => true,
  loadMoreItems: (startIndex: number, stopIndex: number) => {},
  hasMore: false,
};
