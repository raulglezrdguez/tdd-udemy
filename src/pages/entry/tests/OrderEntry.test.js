import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';

import { server } from '../../../mocks/server';
import OrderEntry from '../OrderEntry';

describe('OrderEntry', () => {
  test('handle errors for scoops and topping routes', async () => {
    server.resetHandlers(
      rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
        return res(ctx.status(500));
      }),
      rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<OrderEntry />);

    // await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert', {
      // name: 'An unexpected error ocurred. Please try again later.',
    });

    expect(alerts).toHaveLength(2);
    // });
  });
});
