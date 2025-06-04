import CharacterCard from './CharacterCard';
import { Link } from 'react-router';
import '../styles/List.scss';

const CharacterList = ({ data, isError, isPending }) => {
	return (
		<div>
			{isError && (
				<div data-testid="error__message">Oops! Something went wrong</div>
			)}
			{isPending && <div data-testid="loading__message">Loading...</div>}
			{!isPending && !isError && (
				<ul className="list" data-testid="character__list">
					{data.map(item => (
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
