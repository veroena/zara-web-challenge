import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CharacterList from '../../components/CharacterList';
import { MemoryRouter, Routes, Route } from 'react-router';

const data = [
	{
		thumbnail: {
			path: 'imagepath',
			extension: 'jpg',
		},
		name: 'Character1',
	},
	{
		thumbnail: {
			path: 'imagepath',
			extension: 'jpg',
		},
		name: 'Character2',
	},
];
const isError = true;
const isPending = true;

describe('CharacterList', () => {
	it('renders the CharacterList component', () => {
		render(
			<CharacterList
				data={data}
				isError={isError}
				isPending={isPending}
			/>
		);
	});

	it('shows an error message when the request returns an error', () => {
		render(
			<CharacterList
				data={data}
				isError={isError}
				isPending={!isPending}
			/>
		);

		expect(screen.getByTestId('error__message')).toBeInTheDocument();
		expect(screen.getByTestId('error__message')).toHaveTextContent(
			'Oops! Something went wrong'
		);
	});

	it('does not render a list when the request returns an error', () => {
		render(
			<CharacterList
				data={data}
				isError={isError}
				isPending={!isPending}
			/>
		);

		expect(screen.queryByTestId('character__list')).not.toBeInTheDocument();
	});

	it('shows a loading message when the request is pending', () => {
		render(
			<CharacterList
				data={data}
				isError={!isError}
				isPending={isPending}
			/>
		);

		expect(screen.getByTestId('loading__message')).toBeInTheDocument();
		expect(screen.getByTestId('loading__message')).toHaveTextContent(
			'Loading...'
		);
	});

	it('does not render a list when the request is pending', () => {
		render(
			<CharacterList
				data={data}
				isError={!isError}
				isPending={isPending}
			/>
		);

		expect(screen.queryByTestId('character__list')).not.toBeInTheDocument();
	});

	it('shows a list when the request succeeds', () => {
		render(
			<MemoryRouter>
				<CharacterList
					data={data}
					isError={!isError}
					isPending={!isPending}


				/>
			</MemoryRouter>
		);

		expect(screen.getByTestId('character__list')).toBeInTheDocument();
		expect(screen.queryByTestId('loading__message')).not.toBeInTheDocument();
		expect(screen.queryByTestId('error__message')).not.toBeInTheDocument();
	});

	it('shows elements provided by data', () => {
		render(
			<MemoryRouter>
				<CharacterList
					data={data}
					isError={!isError}
					isPending={!isPending}


				/>
			</MemoryRouter>
		);

		expect(screen.getAllByTestId('character__list--item')).toHaveLength(
			data.length
		);
		expect(screen.getAllByTestId('card__name')[0]).toHaveTextContent(
			'Character1'
		);
		expect(screen.getAllByTestId('card__name')[1]).toHaveTextContent(
			'Character2'
		);
	});

	it('navigates to other page when the links inside the list are clicked', () => {
		render(
			<MemoryRouter>
				<Routes>
					<Route
						path="/"
						element={
							<CharacterList
								data={data}
								isError={!isError}
								isPending={!isPending}
			
			
							/>
						}
					/>
					<Route path="/character1" element={<div>Character 1 element</div>} />
				</Routes>
			</MemoryRouter>
		);

		expect(screen.getByTestId('character__list')).toBeInTheDocument();
		expect(screen.queryByText('Character 1 element')).not.toBeInTheDocument();

		fireEvent.click(screen.getAllByTestId('character__link')[0]);

		expect(screen.getByText('Character 1 element')).toBeInTheDocument();
		expect(screen.queryByTestId('character__list')).not.toBeInTheDocument();
	});
});
