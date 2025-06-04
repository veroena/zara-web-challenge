import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import Home from '../../pages/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const data = [];
const isError = true;
const isPending = true;
const numberOfResults = 10;
const getFavorite = vi.fn();
const favorites = [];

const queryClient = new QueryClient();

const homeWithMemoryRouter = () => {
	return (
		<MemoryRouter>
			<QueryClientProvider client={queryClient}>
				<Home
					data={data}
					isError={!isError}
					isPending={!isPending}
					numberOfResults={numberOfResults}
					getFavorite={getFavorite}
					favorites={favorites}
				/>
			</QueryClientProvider>
		</MemoryRouter>
	);
};

describe('Home', () => {
	it('renders the Home component', () => {
		render(homeWithMemoryRouter());
	});
});
