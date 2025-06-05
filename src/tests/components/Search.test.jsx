import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Search from '../../components/Search';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSearchStore } from '../../store';
import * as UseGetCharacterSearchHook from '../../hooks/useGetCharacterSearch';
import * as UseGetCharacterListHook from '../../hooks/useGetCharacterList';

const queryClient = new QueryClient();

const wrappedSearchComponent = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Search />
		</QueryClientProvider>
	);
};

const mockData = {
	data: {
		results: [
			{
				thumbnail: {
					path: 'thor-image',
					extension: 'jpg',
				},
				id: 1,
				name: 'thor',
				description: 'Norse god',
			},
			{
				thumbnail: {
					path: 'storm-image',
					extension: 'jpg',
				},
				id: 2,
				name: 'storm',
				description: 'mutant part of the X-Men',
			},
		],
	},
};

const mockDataSearch = {
	data: {
		results: [
			{
				thumbnail: {
					path: 'iron-man-image',
					extension: 'jpg',
				},
				id: 1,
				name: 'iron man',
				description: 'Tony Stark',
			},
		],
	},
};

const UseGetCharacterListSpy = vi.spyOn(
	UseGetCharacterListHook,
	'UseGetCharacterList'
);
UseGetCharacterListSpy.mockReturnValue({ data: mockData });

const UseGetCharacterSearchSpy = vi.spyOn(
	UseGetCharacterSearchHook,
	'UseGetCharacterSearch'
);
UseGetCharacterSearchSpy.mockReturnValue({ searchData: mockDataSearch });

useSearchStore.setState({ searchTerm: '' });

describe('Search', () => {
	it('renders the Search component', () => {
		render(wrappedSearchComponent());
	});

	it('shows an input type text for search', () => {
		render(wrappedSearchComponent());

		expect(screen.getByTestId('search__bar')).toBeInTheDocument();
	});

	it('shows the provided value in the search bar', () => {
		useSearchStore.setState({ searchTerm: 'search term example' });
		render(wrappedSearchComponent());

		expect(screen.getByTestId('search__bar')).toHaveValue(
			'search term example'
		);
	});

	it('shows the number of results', () => {
		render(wrappedSearchComponent());

		expect(screen.getByTestId('search__results')).toHaveTextContent(
			mockData.data.results.length
		);
	});

	it('updates the search term when the user types in the input', async () => {
		render(wrappedSearchComponent());

		fireEvent.change(screen.getByTestId('search__bar'), {
			target: { value: 'new value' },
		});

		expect(screen.getByTestId('search__bar')).toHaveValue('new value');
	});

	it('resets the search value when the user clicks on the input', () => {
		render(wrappedSearchComponent());

		fireEvent.change(screen.getByTestId('search__bar'), {
			target: { value: 'new value' },
		});

		expect(screen.getByTestId('search__bar')).toHaveValue('new value');

		fireEvent.click(screen.getByTestId('search__bar'));

		expect(screen.getByTestId('search__bar')).toHaveValue('');
	});

	it('calls a refetch when the form submits', () => {
		const UseGetCharacterSearchSpy = vi.spyOn(
			UseGetCharacterSearchHook,
			'UseGetCharacterSearch'
		);
		UseGetCharacterSearchSpy.mockReturnValue({ refetch: vi.fn });
		render(wrappedSearchComponent());

		fireEvent.change(screen.getByTestId('search__bar'), {
			target: { value: 'new value' },
		});

		fireEvent.submit(screen.getByTestId('search__form'));

		expect(UseGetCharacterSearchSpy).toHaveBeenCalled();
	});
});
