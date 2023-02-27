import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

// test('', () => {});

describe('Testa componete App', () => {
  test('Testa se existe o texto Home', () => {
    renderWithRouter(<App />);
    const titleHome = screen.getByText('Home');
    expect(titleHome).toBeInTheDocument();
  });

  test('Testa se existe o link Home da barra de navegação;', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole(
      'link',
      { name: /home/i },
    );
    expect(homeLink).toBeInTheDocument();
  });

  test('Testa se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    // renderWithRouter(<App />);
    // const aboutLink = screen.getByRole('link', { name: /about/i });
    const aboutLink = screen.getByRole(
      'link',
      { name: /About/i },
    );
    // console.log(aboutLink);
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Testa se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação;', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole(
      'link',
      { name: /Favorite Pokémon/i },
    );
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Testa se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/notExist/');
    });
    const notFoundTitle = screen.getByRole('heading', { name: 'Page requested not found', level: 2 });
    expect(notFoundTitle).toBeInTheDocument();
  });
});
