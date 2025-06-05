import { MemoryRouter, Routes, Route } from 'react-router';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useFavoriteStore } from '../../store/store';
import Header from '../../components/Header/Header';

const favoritesFilled = [{}, {}];

const wrappedHeader = (
	<MemoryRouter>
		<Routes>
			<Route path="/" element={<Header />} />
			<Route path="/favorites" element={<div>Favorites Page</div>} />
		</Routes>
	</MemoryRouter>
);

describe('Header', () => {
	it('renders the CharacterCard component', () => {
		render(wrappedHeader);
	});

	it('displays Marvel logo image', () => {
		render(wrappedHeader);

		const marvelLogoImage = screen.getByAltText('Marvel Logo');

		expect(marvelLogoImage).toBeInTheDocument();
	});

	it('navigates to other page when the favorites icon is clicked', () => {
		render(wrappedHeader);

		expect(screen.getByAltText('Marvel Logo')).toBeInTheDocument();

		fireEvent.click(screen.getByTestId('header__link--favorites'));

		expect(screen.getByText('Favorites Page')).toBeInTheDocument();
		expect(screen.queryByAltText('Marvel Logo')).not.toBeInTheDocument();
	});

	it('returns to page when the Marvel logo link is clicked', () => {
		render(wrappedHeader);

		fireEvent.click(screen.getByTestId('header__link--marvel'));

		expect(screen.getByAltText('Marvel Logo')).toBeInTheDocument();
		expect(screen.queryByText('Favorites Page')).not.toBeInTheDocument();
	});

	it('shows empty heart icon when there are no favorites', () => {
		render(wrappedHeader);

		expect(screen.getByTestId('header__favorites--empty')).toBeInTheDocument();
		expect(
			screen.queryByTestId('header__favorites--fill')
		).not.toBeInTheDocument();
	});

	it('shows empty heart icon when there are some favorites', () => {
		useFavoriteStore.setState({ favorites: favoritesFilled });
		render(wrappedHeader);

		expect(screen.getByTestId('header__favorites--fill')).toBeInTheDocument();
		expect(
			screen.queryByTestId('header__favorites--empty')
		).not.toBeInTheDocument();
	});

	it('shows favorites count', () => {
		useFavoriteStore.setState({ favorites: favoritesFilled });
		render(wrappedHeader);

		expect(screen.getByTestId('header__favorites--count')).toHaveTextContent(
			favoritesFilled.length
		);
	});
});
