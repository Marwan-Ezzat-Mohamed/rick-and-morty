import { ComponentStory, ComponentMeta } from '@storybook/react';

import VirtualGrid from '.';

import { Box } from '@mui/material';

export default {
  title: 'Reusable Components/Virtual Grid',
  component: VirtualGrid,
} as ComponentMeta<typeof VirtualGrid>;

const gridProps = {
  itemHeight: 100,
  itemWidth: 100,
  gap: 1,
  loadMoreItems: () => {
    console.log('load more items');
  },
  isItemLoaded: (index: number) => true,
  hasMore: true,
};

const Card = ({ index }: { index: number }) => {
  return (
    <Box
      sx={{
        height: 50,
        width: 25,
        backgroundColor: 'red',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}
    >
      {index}
    </Box>
  );
};

const mockItems = Array.from({ length: 1000 }).map((_, index) => ({
  index: index,
}));

const PrimaryTemplate: ComponentStory<typeof VirtualGrid> = args => (
  <Box
    sx={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <VirtualGrid {...gridProps} items={mockItems} ItemCard={Card} />
  </Box>
);

export const Primary = PrimaryTemplate.bind({});

const LoadingTemplate: ComponentStory<typeof VirtualGrid> = args => (
  <Box
    sx={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <VirtualGrid {...gridProps} items={null} ItemCard={Card} />
  </Box>
);

export const Loading = LoadingTemplate.bind({});

const EmptyTemplate: ComponentStory<typeof VirtualGrid> = args => (
  <Box
    sx={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <VirtualGrid {...gridProps} items={[]} ItemCard={Card} />
  </Box>
);

export const Empty = EmptyTemplate.bind({});
