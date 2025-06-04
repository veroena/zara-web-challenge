import { useFavoriteStore } from '../store';

export const useHandleFavorite = () => {
	const { favorites, setFavorites } = useFavoriteStore(state => state);

	const handleFavorite = (e, value) => {
		e.preventDefault();
		e.stopPropagation();
		if (favorites.length > 0) {
			const index = favorites?.findIndex(item => item?.id === value?.id);
			if (index !== -1) {
				const filteredFaves = favorites?.filter((_, i) => i !== index);
				setFavorites(filteredFaves);
			} else {
				setFavorites([...favorites, value]);
			}
		} else {
			setFavorites([...favorites, value]);
		}
	};

	return { handleFavorite };
};
