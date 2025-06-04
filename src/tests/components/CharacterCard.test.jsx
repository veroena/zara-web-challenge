import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CharacterCard from '../../components/CharacterCard';
import { useFavoriteStore } from '../../store';

const character = {
	thumbnail: {
		path: 'imagepath',
		extension: 'jpg',
	},
	name: 'Test Character',
};

const favoritesWithCharacter = [{ character }];

const getFavorite = vi.fn();

describe('CharacterCard', () => {
	it('renders the CharacterCard component', () => {
		render(<CharacterCard character={character} getFavorite={getFavorite} />);
	});

	it('shows an image of the character on the card', () => {
		render(<CharacterCard character={character} getFavorite={getFavorite} />);

		expect(screen.getByTestId('card__img').src).toContain('imagepath.jpg');
	});

	it('shows the name of the character on the card', () => {
		render(<CharacterCard character={character} getFavorite={getFavorite} />);

		expect(screen.getByTestId('card__name')).toHaveTextContent(
			'Test Character'
		);
	});

	it('an action is triggered on favorites button click', () => {
		render(<CharacterCard character={character} getFavorite={getFavorite} />);

		const favoritesButton = screen.getByTestId('card__favorites--button');
		fireEvent.click(favoritesButton);

		expect(getFavorite).toHaveBeenCalled();
	});

	it('shows an empty heart icon if the character is not included in the favorites', () => {
		render(<CharacterCard character={character} getFavorite={getFavorite} />);

		expect(screen.getByTestId('heart__icon--empty')).toBeInTheDocument();
		expect(screen.queryByTestId('heart__icon--fill')).not.toBeInTheDocument();
	});

	it('shows a filled heart icon if the character is  included in the favorites', () => {
		useFavoriteStore.setState({ favorites: favoritesWithCharacter });
		render(
			<CharacterCard
				character={character}
				// favorites={favoritesWithCharacter}
				getFavorite={getFavorite}
			/>
		);

		expect(screen.getByTestId('heart__icon--fill')).toBeInTheDocument();
		expect(screen.queryByTestId('heart__icon--empty')).not.toBeInTheDocument();
	});
});
