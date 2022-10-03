/* eslint-disable testing-library/no-debugging-utils */
import { rest } from 'msw';

import { render, screen } from '@testing-library/react';
import { server } from '../../../../mocks/server';

import Pets from './Pets';

describe('Pets', () => {
  test('should show filters and cats', async () => {
    render(<Pets />);

    const filters = screen.getAllByRole('combobox');
    expect(filters.length).toBe(2);

    const catCards = await screen.findAllByRole('article');
    expect(catCards.length).toBe(5);
  });

  test('should show error message on server error', async () => {
    server.resetHandlers(
      rest.get('http://localhost:3030/cats', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<Pets />);

    // expect error
    const alert = await screen.findByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent(
      /an unexpected error ocurred. please try again later/i
    );
  });
});
