import React from 'react';
import { getNodeText, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from './Data/PokemonList';

const pokemonName = pokemonList.map((pokemon) => pokemon.name);
const pokemonType = pokemonList.map((pokemon) => pokemon.type);

// console.log(pokemonName);
describe('Teste do componente Pokedex', () => {
  test('Testa se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole(
      'heading',
      { name: /Encountered Pokémon/i },
      { level: 2 },
    );
    expect(title).toBeInTheDocument();
  });

  test('Testa se existe um botão com o nome Próximo Pokémon', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole(
      'button',
      { name: /Próximo Pokémon/i },
    );
    expect(nextButton).toBeInTheDocument();
  });
  test('Testa se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole(
      'button',
      { name: /Próximo Pokémon/i },
    );
    expect(nextButton).toBeInTheDocument();
    userEvent.click(nextButton);
    const nameNextPokemon = screen.getAllByTestId('pokemon-name');
    // console.log(nameNextPokemon);
    expect(nameNextPokemon.length).toEqual(1);
  });

  test('Verifica se existe um botão para cada tipo de pokemon', () => {
    renderWithRouter(<App />);
    const filterButton = screen.getAllByTestId('pokemon-type-button').map(getNodeText);
    console.log(filterButton);
    expect(filterButton).toContain('Electric');
    expect(filterButton).toContain('Fire');
    expect(filterButton).toContain('Bug');
    expect(filterButton).toContain('Poison');
    expect(filterButton).toContain('Psychic');
    expect(filterButton).toContain('Normal');
    expect(filterButton).toContain('Dragon');
    expect(filterButton).not.toContain('All');
    expect(filterButton.length).toEqual(7);
    // console.log(pokemonType);

    filterButton.forEach((type) => {
      console.log(type);
      const filterTypeButton = screen.getByRole(
        'button',
        { name: `${type}` },
      );
      console.log(filterTypeButton.innerHTML);

      if (type === filterTypeButton.innerHTML) {
        const allButton = screen.getByRole(
          'button',
          { name: /all/i },
        );
        userEvent.click(filterTypeButton);
        const typePokemon = screen.getByTestId('pokemon-type').innerHTML;
        console.log(typePokemon);
        expect(typePokemon).toBe(filterTypeButton.innerHTML);
        expect(allButton).toBeVisible();
      }
      // console.log(type);
      // console.log(typePokemon);
      // expect(typePokemon).toBe(type);
    });
  });

  test('Testa o botão All', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole(
      'button',
      { name: /all/i },
    );
    expect(allButton).toBeVisible();
  });

  // test('Testa se quando estiver no último pokemon, clicando no botão Próximo Pokémon, retorna para o primeiro Pokemon', () => {
  //   renderWithRouter(<App />);
  //   const nextButton = screen.getByRole(
  //     'button',
  //     { name: /Próximo Pokémon/i },
  //   );
  // });
});

// test('', () => {});
