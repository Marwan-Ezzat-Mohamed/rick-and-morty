import { ComponentStory, ComponentMeta } from '@storybook/react';

import NavBar from '.';
import { Box } from '@mui/material';

export default {
  title: 'Components/NavBar',
  component: NavBar,
} as ComponentMeta<typeof NavBar>;

const Template: ComponentStory<typeof NavBar> = args => (
  <Box
    sx={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <NavBar />
  </Box>
);
export const Primary = Template.bind({});
Primary.args = {};
