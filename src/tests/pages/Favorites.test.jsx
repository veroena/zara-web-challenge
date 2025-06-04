import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router';
import Favorites from '../../pages/Favorites';

const emptyFavorites = [];

const favorites = [
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

const getFavorite = vi.fn();

describe('Favorites', () => {
	it('renders the Favorites component', () => {
		render(
			<MemoryRouter>
				<Favorites favorites={emptyFavorites} getFavorite={getFavorite} />
			</MemoryRouter>
		);
	});

	it('shows a list of favorite characters', () => {
		render(
			<MemoryRouter>
				<Favorites favorites={favorites} getFavorite={getFavorite} />
			</MemoryRouter>
		);

		expect(screen.getAllByTestId('favorites__list--item')).toHaveLength(
			favorites.length
		);
	});

	it('navigates to other page when the link on a favorite card is clicked', () => {
		render(
			<MemoryRouter initialEntries={['/favorites']}>
				<Routes>
					<Route
						path="/favorites"
						element={
							<Favorites favorites={favorites} getFavorite={getFavorite} />
						}
					/>
					<Route path="/thor" element={<div>This is a Thor detail page</div>} />
				</Routes>
			</MemoryRouter>
		);

		const linkFavorites = screen.getAllByTestId('favorites__list--link');

		fireEvent.click(linkFavorites[0]);

		expect(screen.getByText('This is a Thor detail page')).toBeInTheDocument();
		expect(
			screen.queryByTestId('favorites__list--link')
		).not.toBeInTheDocument();
	});
});
