import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import CharacterCard from './CharacterCard';
import { mockCharacters } from './../../../__mocks__/characters.mock';

const character = mockCharacters.characters.results[0];

describe('CharacterCard', () => {
  it('matches snapshot', () => {
    const rendered = render(<CharacterCard character={character} />);
    expect(rendered).toMatchSnapshot();
  });

  it('renders skeleton when character is null', () => {
    const rendered = render(<CharacterCard character={null} />);
    expect(
      rendered.container.querySelector('.MuiSkeleton-root'),
    ).toBeInTheDocument();
  });
});
