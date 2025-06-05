import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import * as useGetComicListHooks from '../../hooks/useGetComicList';
import ComicList from '../../components/ComicList';

const queryClient = new QueryClient();

const characterId = 123;

const mockComicData = {
	data: {
		results: [
			{
				id: 1,
				images: [{ path: 'comicThor1' }, { extension: 'jpg' }],
				title: 'Thor Comic 1',
				dates: [
					{
						type: 'onsaleDate',
						date: '1997-06-01T00:00:00+0000',
					},
				],
			},
			{
				id: 2,
				images: [],
				title: 'Thor Comic 2',
				dates: [
					{
						type: 'onsaleDate',
						date: '1987-06-01T00:00:00+0000',
					},
				],
			},
		],
	},
};

const useGetComicsListSpy = vi.spyOn(useGetComicListHooks, 'UseGetComicList');

useGetComicsListSpy.mockReturnValue({ data: mockComicData });

describe('ComicList', () => {
	it('renders the ComicList component', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<ComicList characterId={characterId} />
			</QueryClientProvider>
		);
	});

	it('shows a list of comics', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<ComicList characterId={characterId} />
			</QueryClientProvider>
		);

		expect(screen.getAllByTestId('comics__list--item')).toHaveLength(
			mockComicData.data.results.length
		);
	});

	it('shows comics listed by earlier date', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<ComicList characterId={characterId} />
			</QueryClientProvider>
		);

		const firstItem = screen.getAllByTestId('comics__list--item')[0];
		const secondItem = screen.getAllByTestId('comics__list--item')[1];

		expect(firstItem).toHaveTextContent('Thor Comic 2');
		expect(secondItem).toHaveTextContent('Thor Comic 1');
	});

	it('shows a cover of the comic', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<ComicList characterId={characterId} />
			</QueryClientProvider>
		);

		expect(screen.getByTestId('comics__image').src).toContain('comicThor1');
	});

	it('shows a text if the comic does not have a cover', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<ComicList characterId={characterId} />
			</QueryClientProvider>
		);

		expect(screen.getByTestId('comics__image--not-found')).toHaveTextContent(
			'Cover not found'
		);
	});

	it('shows the year each comic was published', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<ComicList characterId={characterId} />
			</QueryClientProvider>
		);

		expect(screen.getAllByTestId('comics__year')[0]).toHaveTextContent('1987');
		expect(screen.getAllByTestId('comics__year')[1]).toHaveTextContent('1997');
	});
});
