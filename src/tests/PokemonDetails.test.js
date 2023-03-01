import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente PokemonDetails', () => {
  test('Testa se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole(
      'link',
      { name: /More details/i },
    );
    userEvent.click(moreDetailsLink);
    const detailsTitle = screen.getByRole(
      'heading',
      { name: /Pikachu Details/ },
      { level: 2 },
    );
    expect(detailsTitle).toBeInTheDocument();
    expect(moreDetailsLink).not.toBeInTheDocument();
    const summaryTitle = screen.getByRole(
      'heading',
      { name: /Summary/ },
      { level: 2 },
    );
    expect(summaryTitle).toBeInTheDocument();
  });

  test('Testa se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    // renderWithRouter(<PokemonDetails />);
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole(
      'link',
      { name: /More details/i },
    );
    userEvent.click(moreDetailsLink);
    const locationsTitle = screen.getByRole(
      'heading',
      { name: /Game Locations of Pikachu/ },
      { level: 2 },
    );
    expect(locationsTitle).toBeInTheDocument();

    const locationImages = screen.getAllByRole(
      'img',
      { name: /pikachu location/i },
    );
    // console.log(locationImages[0]);
    expect(locationImages[0]).toHaveAttribute(
      'src',
      'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png',
    );
    expect(locationImages[0]).toHaveAttribute(
      'alt',
      'Pikachu location',
    );
    expect(locationImages[1]).toHaveAttribute(
      'src',
      'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png',
    );
    expect(locationImages[1]).toHaveAttribute(
      'alt',
      'Pikachu location',
    );
  });

  test('Testa se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole(
      'link',
      { name: /More details/i },
    );
    userEvent.click(moreDetailsLink);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    const checkboxLabelText = screen.getByLabelText(/Pokémon favoritado?/);
    expect(checkboxLabelText).toBeInTheDocument();
    // console.log(checkbox);

    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});

// test('', () => {});
