import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useFavoriteStore } from '../../store/store';
import * as useHandleFavoriteHook from '../../hooks/useHandleFavorite';
import CharacterCard from '../../components/CharacterCard/CharacterCard';

const character = {
	thumbnail: {
		path: 'imagepath',
		extension: 'jpg',
	},
	name: 'Test Character',
};

const favoritesWithCharacter = [{ character }];

describe('CharacterCard', () => {
	it('renders the CharacterCard component', () => {
		render(<CharacterCard character={character} />);
	});

	it('shows an image of the character on the card', () => {
		render(<CharacterCard character={character} />);

		expect(screen.getByTestId('card__img').src).toContain('imagepath.jpg');
	});

	it('shows the name of the character on the card', () => {
		render(<CharacterCard character={character} />);

		expect(screen.getByTestId('card__name')).toHaveTextContent(
			'Test Character'
		);
	});

	it('an action is triggered on favorites button click', () => {
		const useHandleFavoriteSpy = vi.spyOn(
			useHandleFavoriteHook,
			'useHandleFavorite'
		);
		useHandleFavoriteSpy.mockReturnValue({ handleFavorite: vi.fn() });
		render(<CharacterCard character={character} />);

		const favoritesButton = screen.getByTestId('card__favorites--button');
		fireEvent.click(favoritesButton);

		expect(useHandleFavoriteSpy).toHaveBeenCalled();
	});

	it('shows an empty heart icon if the character is not included in the favorites', () => {
		render(<CharacterCard character={character} />);

		expect(screen.getByTestId('heart__icon--empty')).toBeInTheDocument();
		expect(screen.queryByTestId('heart__icon--fill')).not.toBeInTheDocument();
	});

	it('shows a filled heart icon if the character is  included in the favorites', () => {
		useFavoriteStore.setState({ favorites: favoritesWithCharacter });
		render(<CharacterCard character={character} />);

		expect(screen.getByTestId('heart__icon--fill')).toBeInTheDocument();
		expect(screen.queryByTestId('heart__icon--empty')).not.toBeInTheDocument();
	});
});
