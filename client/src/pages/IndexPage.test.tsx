import React from 'react';
import { render, screen } from '@testing-library/react';
import { IndexPage } from './IndexPage';

test('renders the play button', () => {
  render(<IndexPage />);
  const linkElement = screen.getByText(/Play Game/i);
  expect(linkElement).toBeInTheDocument();
});
