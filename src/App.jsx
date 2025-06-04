import './styles/App.scss';
import Home from './pages/Home';
import CharacterDetail from './pages/CharacterDetail';
import Favorites from './pages/Favorites';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { UseGetCharacterList } from './hooks/useGetCharacterList';
import { UseGetCharacterSearch } from './hooks/useGetCharacterSearch';
import { useSearchStore } from './store';
import { useFavoriteStore } from './store';

const App = () => {
	const { searchTerm } = useSearchStore(state => state);
	const { favorites, setFavorites } = useFavoriteStore(state => state);
	const { data, isError, isPending } = UseGetCharacterList();
	const { data: searchData } = UseGetCharacterSearch(searchTerm);

	const getFavorite = (e, value, favoritesArray) => {
		e.preventDefault();
		e.stopPropagation();
		if (favoritesArray.length > 0) {
			const index = favoritesArray?.findIndex(item => item?.id === value?.id);
			if (index !== -1) {
				const filteredFaves = favoritesArray?.filter((_, i) => i !== index);
				setFavorites(filteredFaves);
			} else {
				setFavorites([...favoritesArray, value]);
			}
		} else {
			setFavorites([...favoritesArray, value]);
		}
	};

	const router = createBrowserRouter([
		{
			path: '/',
			element: (
				<Home
					data={
						searchData === undefined
							? data?.data.results
							: searchData?.data.results
					}
					isError={isError}
					isPending={isPending}
					numberOfResults={
						searchData === undefined
							? data?.data.results.length
							: searchData?.data.results.length
					}
					getFavorite={getFavorite}
				/>
			),
			errorElement: <div>Oops! Something went bad...</div>,
		},
		{
			path: '/:characterName',
			element: (
				<CharacterDetail
					data={
						searchData === undefined
							? data?.data.results
							: searchData?.data.results
					}
					getFavorite={getFavorite}
				/>
			),
		},
		{
			path: '/favorites',
			element: (
				<Favorites
					numberOfResults={favorites.length}
					getFavorite={getFavorite}
				/>
			),
		},
	]);

	return (
		<div className="app">
			<RouterProvider router={router} />
		</div>
	);
};

export default App;
