import { MemoryRouter, Routes, Route } from 'react-router';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useFavoriteStore } from '../../store';
import Favorites from '../../pages/Favorites';

const mockedFavorites = [
	{
		thumbnail: {
			path: 'thor-image',
			extension: 'jpg',
		},
		id: 1,
		name: 'thor',
		description: 'Norse god',
	},
	{
		thumbnail: {
			path: 'storm-image',
			extension: 'jpg',
		},
		id: 2,
		name: 'storm',
		description: 'mutant part of the X-Men',
	},
];

useFavoriteStore.setState({ favorites: mockedFavorites });

const wrappedFavorites = (
	<MemoryRouter initialEntries={['/favorites']}>
		<Routes>
			<Route path="/favorites" element={<Favorites />} />
			<Route path="/thor" element={<div>This is a Thor detail page</div>} />
		</Routes>
	</MemoryRouter>
);

describe('Favorites', () => {
	it('renders the Favorites component', () => {
		render(wrappedFavorites);
	});

	it('shows a list of favorite characters', () => {
		render(wrappedFavorites);

		expect(screen.getAllByTestId('favorites__list--item')).toHaveLength(
			mockedFavorites.length
		);
	});

	it('navigates to other page when the link on a favorite card is clicked', () => {
		render(wrappedFavorites);

		const linkFavorites = screen.getAllByTestId('favorites__list--link');

		fireEvent.click(linkFavorites[0]);

		expect(screen.getByText('This is a Thor detail page')).toBeInTheDocument();
		expect(
			screen.queryByTestId('favorites__list--link')
		).not.toBeInTheDocument();
	});
});
