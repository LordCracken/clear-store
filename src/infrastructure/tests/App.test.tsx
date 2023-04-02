import renderWithRouter from './renderWithRouter';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

describe('App component', () => {
  test('click logo', async () => {
    const { user } = renderWithRouter(<App />, { route: '/profile' });

    const title = screen.getByText(/programmaticon/i);
    await user.click(title);

    expect(screen.getByTestId('products-page')).toBeInTheDocument();
  });

  it('should open cart', async () => {
    renderWithRouter(<App />);
    const cartButton = screen.getByTestId('cart-button');
    await userEvent.click(cartButton);
    expect(screen.getByTestId('cart-title')).toBeInTheDocument();
  });
});
