import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from '../../components/Header';
import { MemoryRouter, Routes, Route } from 'react-router';


const favorites = [];
const favoritesFilled = [{}, {}];


describe('Header', () => {

  it('renders the CharacterCard component', () => {
    render(
      <MemoryRouter>
        <Header favorites={ favorites } />)
      </MemoryRouter>
    );
  });

  it('displays Marvel logo image as title', () => {
    render(
      <MemoryRouter>
        <Header favorites={ favorites } />
      </MemoryRouter>
    )

    const marvelLogoImage = screen.getByAltText('Marvel Logo');

    expect(screen.getByRole('heading', { level: 1 })).toContain(marvelLogoImage);
  });

  it('navigates to other page when the favorites icon is clicked', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={ <Header favorites={ favorites } /> } />
          <Route path="/favorites" element={ <div>Favorites Page</div> } />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByAltText('Marvel Logo')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('header__link--favorites'));

    expect(screen.getByText('Favorites Page')).toBeInTheDocument();
    expect(screen.queryByAltText('Marvel Logo')).not.toBeInTheDocument();
  });

  it('returns to page when the Marvel logo link is clicked', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={ <Header favorites={ favorites } /> } />
          <Route path="/favorites" element={ <div>Favorites Page</div> } />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId('header__link--marvel'));

    expect(screen.getByAltText('Marvel Logo')).toBeInTheDocument();
    expect(screen.queryByText('Favorites Page')).not.toBeInTheDocument();
  });

  it('shows empty heart icon when there are no favorites', () => {
    render(
      <MemoryRouter>
        <Header favorites={ favorites } />
      </MemoryRouter>
    );

    expect(screen.getByTestId('header__favorites--empty')).toBeInTheDocument();
    expect(screen.queryByTestId('header__favorites--fill')).not.toBeInTheDocument();
  });

  it('shows empty heart icon when there are some favorites', () => {
    render(
      <MemoryRouter>
        <Header favorites={ favoritesFilled } />
      </MemoryRouter>
    );

    expect(screen.getByTestId('header__favorites--fill')).toBeInTheDocument();
    expect(screen.queryByTestId('header__favorites--empty')).not.toBeInTheDocument();
  });

  it('shows favorites count', () => {
    render(
      <MemoryRouter>
        <Header favorites={ favoritesFilled } />
      </MemoryRouter>
    );

    expect(screen.getByTestId('header__favorites--count')).toHaveTextContent(favoritesFilled.length);
  });
});
    