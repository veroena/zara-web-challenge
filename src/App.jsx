import './styles/App.scss';
import Home from './pages/Home';
import CharacterDetail from './pages/CharacterDetail';
import Favorites from './pages/Favorites';
import { createBrowserRouter, RouterProvider } from 'react-router';

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
