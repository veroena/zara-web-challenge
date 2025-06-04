import { create } from 'zustand';

export const useSearchStore = create(set => ({
	searchTerm: '',
	setSearchTerm: newSearchTerm => {
		set(() => ({ searchTerm: newSearchTerm }));
	},
	resetSearch: () => {
		set(() => ({ searchTerm: '' }));
	},
}));

export const useFavoriteStore = create((set) => ({
	favorites: [],
	setFavorites: newFavorite => {
		set(() => ({favorites: newFavorite}))
	},
}));
