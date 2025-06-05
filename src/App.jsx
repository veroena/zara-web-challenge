import CharacterDetail from './pages/CharacterDetail/CharacterDetail';
import Favorites from './pages/Favorites/Favorites';
import Home from './pages/Home/Home';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.scss';

const App = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Home />,
			errorElement: <div>Oops! Something went bad...</div>,
		},
		{
			path: '/:characterName',
			element: <CharacterDetail />,
		},
		{
			path: '/favorites',
			element: <Favorites />,
		},
	]);

	return (
		<div className="app">
			<RouterProvider router={router} />
		</div>
	);
};

export default App;
