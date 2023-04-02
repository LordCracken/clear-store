import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';

import Header from '../../components/Header/Header';

it('should render Header', () => {
  renderWithRouter(<Header />);
  const header = screen.getByTestId('header');
  expect(header).toBeInTheDocument();
});
