import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemon from '../pages/FavoritePokemon';
import App from '../App';

describe('Teste do componente FavoritePokemon', () => {
  test('Testa se aparece uma mensagem se não houver pokemon favorito', () => {
    renderWithRouter(<FavoritePokemon />);
    const notFavoriteMessage = screen.getByText(/No favorite Pokémon found/i);
    expect(notFavoriteMessage).toBeInTheDocument();
  });

  test('Testa se é exibido o Pokemon Favoritado', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole(
      'link',
      { name: /More details/i },
    );
    userEvent.click(moreDetailsLink);

    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);

    const favoriteLink = screen.getByRole(
      'link',
      { name: /Favorite Pokémon/i },
    );
    userEvent.click(favoriteLink);

    const favoritePokemon = screen.getByText(/pikachu/i);
    expect(favoritePokemon).toBeInTheDocument();
  });
});
