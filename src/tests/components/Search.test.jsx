import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Search from '../../components/Search';

const numberOfResults = 0;
const refetch = vi.fn();
const getSearchTerm = vi.fn();
const searchTerm = '';
const resetSearch = vi.fn();

describe('Search', () => {
	it('renders the Search component', () => {
		render(
			<Search
				numberOfResults={numberOfResults}
				refetch={refetch}
				getSearchTerm={getSearchTerm}
				searchTerm={searchTerm}
				resetSearch={resetSearch}
			/>
		);
	});

	it('shows an input type text for search', () => {
		render(
			<Search
				numberOfResults={numberOfResults}
				refetch={refetch}
				getSearchTerm={getSearchTerm}
				searchTerm={searchTerm}
				resetSearch={resetSearch}
			/>
		);

		expect(screen.getByTestId('search__bar')).toBeInTheDocument();
	});

	it('shows the provided value in the search bar', () => {
		render(
			<Search
				numberOfResults={numberOfResults}
				refetch={refetch}
				getSearchTerm={getSearchTerm}
				searchTerm={'search term example'}
				resetSearch={resetSearch}
			/>
		);

		expect(screen.getByTestId('search__bar')).toHaveValue(
			'search term example'
		);
	});

	it('shows the number of results', () => {
		const newNumberOfResults = 7;
		render(
			<Search
				numberOfResults={newNumberOfResults}
				refetch={refetch}
				getSearchTerm={getSearchTerm}
				searchTerm={searchTerm}
				resetSearch={resetSearch}
			/>
		);

		expect(screen.getByTestId('search__results')).toHaveTextContent(
			newNumberOfResults
		);
	});
});
