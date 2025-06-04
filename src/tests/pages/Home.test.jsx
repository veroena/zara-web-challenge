import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import Home from '../../pages/Home';

const data = []
const isError = true;
const isPending = true;
const getSearchTerm = vi.fn();
const refetch = vi.fn();
const numberOfResults = 10;
const resetSearch = vi.fn();
const getFavorite = vi.fn();
const favorites = [];

const homeWithMemoryRouter = (newSearchTerm) => {
  return (
    <MemoryRouter>
      <Home
        data={ data }
        isError={ !isError }
        isPending={ !isPending }
        getSearchTerm={ getSearchTerm }
        refetch={ refetch }
        numberOfResults={ numberOfResults }
        searchTerm={ newSearchTerm }
        resetSearch={ resetSearch }
        getFavorite={ getFavorite }
        favorites={ favorites }
      />
    </MemoryRouter>
  )
};

describe('Home', () => {

  it('renders the Home component', () => {
    render(homeWithMemoryRouter());
  });

  it('calls the function to update the search term when the user types in the input', async () => {
    render(homeWithMemoryRouter());

    fireEvent.change(screen.getByTestId('search__bar'), { target: { value: 'new value' } });

    expect(getSearchTerm).toHaveBeenCalled();
  });

  it('calls the function to reset the search value when the user clicks on the input', () => {
    render(homeWithMemoryRouter('existing search term'));

    fireEvent.click(screen.getByTestId('search__bar'));

    expect(resetSearch).toHaveBeenCalled();
  });

  it('calls a refetch when the form submits', () => {
    render(homeWithMemoryRouter());

    fireEvent.change(screen.getByTestId('search__bar'), { target: { value: 'new value' } });

    fireEvent.submit(screen.getByTestId('search__form'));

    expect(refetch).toHaveBeenCalled();
  });
})
