import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import NavBar from './NavBar';

describe('NavBar', () => {
  it('matches snapshot', () => {
    const rendered = render(<NavBar />);
    expect(rendered).toMatchSnapshot();
  });
});
