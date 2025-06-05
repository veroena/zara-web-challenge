import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router';
import CharacterDetail from '../../pages/CharacterDetail';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFavoriteStore } from '../../store';
import { useSearchStore } from '../../store';
import * as useHandleFavoriteHook from '../../hooks/useHandleFavorite';
import * as UseGetCharacterListHooks from '../../hooks/useGetCharacterList';
import * as UseGetCharacterSearchHooks from '../../hooks/useGetCharacterSearch';

const mockData = {
	data: {
		results: [
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
		],
	},
};

const mockDataSearch = {
	data: {
		results: [
			{
				thumbnail: {
					path: 'iron-man-image',
					extension: 'jpg',
				},
				id: 1,
				name: 'iron man',
				description: 'Tony Stark',
			},
		],
	},
};

const favoritesWithStorm = [
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

const queryClient = new QueryClient();

const wrappedCharacterDetail = character => {
	return (
		<QueryClientProvider client={queryClient}>
			<MemoryRouter initialEntries={[`/${character}`]}>
				<Routes>
					<Route path="/:characterName" element={<CharacterDetail />}></Route>
				</Routes>
			</MemoryRouter>
		</QueryClientProvider>
	);
};

const UseGetCharacterListSpy = vi.spyOn(
	UseGetCharacterListHooks,
	'UseGetCharacterList'
);
UseGetCharacterListSpy.mockReturnValue({ data: mockData });

const UseGetCharacterSearchSpy = vi.spyOn(
	UseGetCharacterSearchHooks,
	'UseGetCharacterSearch'
);
UseGetCharacterSearchSpy.mockReturnValue({ searchData: mockDataSearch });

useSearchStore.setState({ searchTerm: '' });

describe('CharacterDetail', () => {
	it('renders the CharacterDetail component', () => {
		render(wrappedCharacterDetail('thor'));
	});

	it('shows the detail of the character that coincides with the url params', () => {
		render(wrappedCharacterDetail('storm'));

		expect(screen.getByTestId('detail__title')).toHaveTextContent('storm');
		expect(screen.getByTestId('detail__title')).not.toHaveTextContent('thor');
	});

	it('shows an image of the character that coincides with the url params', () => {
		render(wrappedCharacterDetail('thor'));

		expect(screen.getByTestId('detail__img').src).toContain('thor-image.jpg');
		expect(screen.getByTestId('detail__img').src).not.toContain(
			'storm-image.jpg'
		);
	});

	it('shows a description of the character that coincides with the url params', () => {
		render(wrappedCharacterDetail('storm'));

		expect(screen.getByTestId('detail__description')).toHaveTextContent(
			'mutant part of the X-Men'
		);
		expect(screen.getByTestId('detail__description')).not.toHaveTextContent(
			'Norse god'
		);
	});

	it('shows an empty heart icon if the character is not in the favorites list', () => {
		useFavoriteStore.setState({ favorites: favoritesWithStorm });
		render(wrappedCharacterDetail('thor'));

		expect(screen.getByTestId('favorites__icon--empty')).toBeInTheDocument();
		expect(
			screen.queryByTestId('favorites__icon--fill')
		).not.toBeInTheDocument();
	});

	it('shows a filled heart icon if the character is in the favorites list', () => {
		useFavoriteStore.setState({ favorites: favoritesWithStorm });
		render(wrappedCharacterDetail('storm'));

		expect(screen.getByTestId('favorites__icon--fill')).toBeInTheDocument();
		expect(
			screen.queryByTestId('favorites__icon--empty')
		).not.toBeInTheDocument();
	});

	it('an action is triggered on favorites button click', () => {
		const useHandleFavoriteSpy = vi.spyOn(
			useHandleFavoriteHook,
			'useHandleFavorite'
		);
		useHandleFavoriteSpy.mockReturnValue({ handleFavorite: vi.fn() });

		useFavoriteStore.setState({ favorites: [] });
		render(wrappedCharacterDetail('storm'));

		const favoritesButton = screen.getByTestId('favorites__icon--empty');
		fireEvent.click(favoritesButton);

		expect(useHandleFavoriteSpy).toHaveBeenCalled();
	});
});
