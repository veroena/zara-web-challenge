import { Link } from 'react-router';
import { UseGetCharacterList } from '../../hooks/useGetCharacterList';
import { UseGetCharacterSearch } from '../../hooks/useGetCharacterSearch';
import { useSearchStore } from '../../store/store';
import CharacterCard from '../CharacterCard/CharacterCard';
import './CharacterList.styles.scss';

const CharacterList = () => {
	const { searchTerm } = useSearchStore(state => state);
	const { data, isError, isPending } = UseGetCharacterList();
	const { data: searchData } = UseGetCharacterSearch(searchTerm);

	const validData =
		searchData === undefined ? data?.data.results : searchData?.data.results;

	return (
		<div>
			{isError && (
				<div data-testid="error__message">Oops! Something went wrong</div>
			)}
			{isPending && <div data-testid="loading__message">Loading...</div>}
			{!isPending && !isError && (
				<ul className="list" data-testid="character__list">
					{validData.map(item => (
						<li
							key={item.id}
							className="list__item"
							data-testid="character__list--item"
						>
							<Link to={`/${item.name}`} data-testid="character__link">
								<CharacterCard character={item} />
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default CharacterList;
