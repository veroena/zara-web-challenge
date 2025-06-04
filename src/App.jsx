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
	const { favorites } = useFavoriteStore(state => state);
	const { data, isError, isPending } = UseGetCharacterList();
	const { data: searchData } = UseGetCharacterSearch(searchTerm);

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
				/>
			),
		},
		{
			path: '/favorites',
			element: <Favorites numberOfResults={favorites.length} />,
		},
	]);

	return (
		<div className="app">
			<RouterProvider router={router} />
		</div>
	);
};

export default App;
