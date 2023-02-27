import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('Testa o componente NotFound', () => {
  test('Testa se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const notFoundMessage = screen.getByRole(
      'heading',
      { name: /Page requested not found/i },
      { level: 2 },
    );
    expect(notFoundMessage).toBeInTheDocument();
  });

  test('Testa se a página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const notFoundImage = screen.getByRole('img');
    expect(notFoundImage).toBeInTheDocument();
    expect(notFoundImage).toHaveAttribute(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});

// test('', () => {});
