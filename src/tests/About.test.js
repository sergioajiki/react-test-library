import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Teste do componente About', () => {
  test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const aboutHeading = screen.getByRole(
      'heading',
      { name: /About Pokédex/i },
      { level: 2 },
    );
    expect(aboutHeading).toBeInTheDocument();
  });

  test('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragraph01 = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon');
    const paragraph02 = screen.getByText('One can filter Pokémon by type, and see more details for each one of them');
    expect(paragraph01).toBeInTheDocument();
    expect(paragraph02).toBeInTheDocument();
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const aboutImage = screen.getByRole('img');
    expect(aboutImage).toBeInTheDocument();
    expect(aboutImage).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});

// test('', () => {});
