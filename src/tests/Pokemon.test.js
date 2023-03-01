import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente Pokemon', () => {
  test('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);
    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toHaveTextContent('Pikachu');

    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toHaveTextContent('Electric');

    const weightPokemon = screen.getByTestId('pokemon-weight');
    expect(weightPokemon).toHaveTextContent('Average weight: 6.0 kg');

    const imagePokemon = screen.getByRole('img');
    expect(imagePokemon).toBeInTheDocument();
    expect(imagePokemon).toHaveAttribute(
      'src',
      'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png',
    );
    expect(imagePokemon).toHaveAttribute(
      'alt',
      'Pikachu sprite',
    );
  });

  test('Testa se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole(
      'link',
      { name: /More details/i },
    );
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');
  });

  test('Testa se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole(
      'link',
      { name: /More details/i },
    );
    userEvent.click(moreDetailsLink);

    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);

    const imageFavorite = screen.getByRole(
      'img',
      { name: 'Pikachu is marked as favorite' },
    );
    expect(imageFavorite).toBeInTheDocument();
    expect(imageFavorite).toHaveAttribute(
      'src',
      '/star-icon.svg',
    );
    expect(imageFavorite).toHaveAttribute(
      'alt',
      'Pikachu is marked as favorite',
    );
  });
});

// test('', () => {});
