import { render, screen } from '@testing-library/react';

import Options from '../Options';

describe('Options', () => {
  test('displays image from each scoop option from server', async () => {
    render(<Options optionType={'scoops'} />);

    // find images
    const images = await screen.findAllByRole('img', { name: /scoop$/i });
    expect(images).toHaveLength(2);

    // confirm alt text of images
    const altText = images.map((image) => image.alt);
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
  });

  test('displays image from each tooping option from server', async () => {
    render(<Options optionType={'toppings'} />);

    // find images
    const images = await screen.findAllByRole('img', { name: /topping$/i });
    expect(images).toHaveLength(3);

    // confirm alt text of images
    const altText = images.map((image) => image.alt);
    expect(altText).toEqual([
      'Cherries topping',
      'M&Ms topping',
      'Hot fudge topping',
    ]);
  });
});
