import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { MemoryRouter } from 'react-router';
import Home from '../../pages/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const data = [];
const isError = true;
const isPending = true;
const numberOfResults = 10;

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
