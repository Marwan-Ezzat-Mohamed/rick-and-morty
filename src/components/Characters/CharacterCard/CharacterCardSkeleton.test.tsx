import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import CharacterCardSkeleton from './CharacterCardSkeleton';

describe('CharacterCardSkeleton', () => {
  it('matches snapshot', () => {
    const rendered = render(<CharacterCardSkeleton />);
    expect(rendered).toMatchSnapshot();
  });
});
