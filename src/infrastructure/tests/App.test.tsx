import renderWithRouter from './renderWithRouter';
import { screen } from '@testing-library/react';

import App from '../App';

test('click logo', async () => {
  const { user } = renderWithRouter(<App />, { route: '/profile' });

  const title = screen.getByText(/programmaticon/i);
  await user.click(title);

  expect(screen.getByTestId('products-page')).toBeInTheDocument();
});
