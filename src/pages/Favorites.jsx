import CharacterCard from '../components/CharacterCard';
import Header from '../components/Header';
import { Link } from 'react-router';
import { useFavoriteStore } from '../store';
import '../styles/Favorites.scss';

const Favorites = ({ getFavorite }) => {
	const { favorites } = useFavoriteStore(state => state);

	return (
		<>
			<Header favorites={favorites} />
			<div className="favorites">
				<h2 className="favorites__title">FAVORITES</h2>
				<div className="favorites__list--container">
					<ul className="favorites__list">
						{favorites.length > 0 &&
							favorites?.map(item => (
								<li
									key={item.id}
									className="favorites__list--item"
									data-testid="favorites__list--item"
								>
									<Link
										to={`/${item.name}`}
										data-testid="favorites__list--link"
									>
										<CharacterCard
											character={item}
											getFavorite={getFavorite}
											favorites={favorites}
										/>
									</Link>
								</li>
							))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default Favorites;
