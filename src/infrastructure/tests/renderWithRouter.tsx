import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const renderWithRouter = (ui: ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  };
};

export default renderWithRouter;
