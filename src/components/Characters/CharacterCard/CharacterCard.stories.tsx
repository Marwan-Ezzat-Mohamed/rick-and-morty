import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CharacterCard from '.';
import { mockCharacters } from '../../../__mocks__/characters.mock';

export default {
  title: 'Components/Character Card',
  component: CharacterCard,
} as ComponentMeta<typeof CharacterCard>;

const Template: ComponentStory<typeof CharacterCard> = args => (
  <CharacterCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  character: mockCharacters.characters.results[0],
};

export const Skeleton = Template.bind({});
Skeleton.args = {};
