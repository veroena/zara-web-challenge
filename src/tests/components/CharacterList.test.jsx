import { MemoryRouter, Routes, Route } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import * as UseGetCharacterListHooks from '../../hooks/useGetCharacterList';
import CharacterList from '../../components/CharacterList/CharacterList';

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

const queryClient = new QueryClient();

const wrappedCharacterList = (
	<QueryClientProvider client={queryClient}>
		<MemoryRouter>
			<Routes>
				<Route path="/" element={<CharacterList />}></Route>
				<Route path="/thor" element={<div>Thor detail</div>} />
			</Routes>
		</MemoryRouter>
	</QueryClientProvider>
);

describe('CharacterList', () => {
	it('renders the CharacterList component', () => {
		render(wrappedCharacterList);
	});

	it('shows an error message when the request returns an error', () => {
		const UseGetCharacterListSpy = vi.spyOn(
			UseGetCharacterListHooks,
			'UseGetCharacterList'
		);
		UseGetCharacterListSpy.mockReturnValue({ isError: true });
		render(wrappedCharacterList);

		expect(screen.getByTestId('error__message')).toBeInTheDocument();
		expect(screen.getByTestId('error__message')).toHaveTextContent(
			'Oops! Something went wrong'
		);
	});

	it('does not render a list when the request returns an error', () => {
		const UseGetCharacterListSpy = vi.spyOn(
			UseGetCharacterListHooks,
			'UseGetCharacterList'
		);
		UseGetCharacterListSpy.mockReturnValue({ isError: true });
		render(wrappedCharacterList);

		expect(screen.queryByTestId('character__list')).not.toBeInTheDocument();
	});

	it('shows a loading message when the request is pending', () => {
		const UseGetCharacterListSpy = vi.spyOn(
			UseGetCharacterListHooks,
			'UseGetCharacterList'
		);
		UseGetCharacterListSpy.mockReturnValue({ isPending: true });
		render(wrappedCharacterList);

		expect(screen.getByTestId('loading__message')).toBeInTheDocument();
		expect(screen.getByTestId('loading__message')).toHaveTextContent(
			'Loading...'
		);
	});

	it('does not render a list when the request is pending', () => {
		const UseGetCharacterListSpy = vi.spyOn(
			UseGetCharacterListHooks,
			'UseGetCharacterList'
		);
		UseGetCharacterListSpy.mockReturnValue({ isPending: true });
		render(wrappedCharacterList);

		expect(screen.queryByTestId('character__list')).not.toBeInTheDocument();
	});

	it('shows a list when the request succeeds', () => {
		const UseGetCharacterListSpy = vi.spyOn(
			UseGetCharacterListHooks,
			'UseGetCharacterList'
		);
		UseGetCharacterListSpy.mockReturnValue({ data: mockData });
		render(wrappedCharacterList);

		expect(screen.getByTestId('character__list')).toBeInTheDocument();
		expect(screen.queryByTestId('loading__message')).not.toBeInTheDocument();
		expect(screen.queryByTestId('error__message')).not.toBeInTheDocument();
	});

	it('shows elements provided by data', () => {
		const UseGetCharacterListSpy = vi.spyOn(
			UseGetCharacterListHooks,
			'UseGetCharacterList'
		);
		UseGetCharacterListSpy.mockReturnValue({ data: mockData });
		render(wrappedCharacterList);

		expect(screen.getAllByTestId('character__list--item')).toHaveLength(
			mockData.data.results.length
		);
		expect(screen.getAllByTestId('card__name')[0]).toHaveTextContent('thor');
		expect(screen.getAllByTestId('card__name')[1]).toHaveTextContent('storm');
	});

	it('navigates to other page when the links inside the list are clicked', () => {
		const UseGetCharacterListSpy = vi.spyOn(
			UseGetCharacterListHooks,
			'UseGetCharacterList'
		);
		UseGetCharacterListSpy.mockReturnValue({ data: mockData });
		render(wrappedCharacterList);

		expect(screen.getByTestId('character__list')).toBeInTheDocument();
		expect(screen.queryByText('Character 1 element')).not.toBeInTheDocument();

		fireEvent.click(screen.getAllByTestId('character__link')[0]);

		expect(screen.getByText('Thor detail')).toBeInTheDocument();
		expect(screen.queryByTestId('character__list')).not.toBeInTheDocument();
	});
});
