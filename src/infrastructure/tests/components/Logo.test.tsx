import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';

import Logo from '../../components/Logo';

it('should render a logo', () => {
  renderWithRouter(<Logo />);
  const title = screen.getByText(/programmaticon/i);
  expect(title).toBeInTheDocument();
});
