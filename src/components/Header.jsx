import { Link } from 'react-router';
import MarvelLogo from '../assets/marvel-logo.png';
import HeartIconEmpty from '../assets/heart-icon-empty.png';
import HeartIconFill from '../assets/heart-icon-fill.svg';
import '../styles/Header.scss';
import { useFavoriteStore } from '../store';

const Header = () => {
	const { favorites } = useFavoriteStore(state => state);
	return (
		<div className="header">
			<Link to="/" data-testid="header__link--marvel">
				<h1 className="header__title">
					<img
						src={MarvelLogo}
						alt="Marvel Logo"
						width="122"
						data-testid="marvel__logo"
					/>
				</h1>
			</Link>
			<Link to="/favorites" data-testid="header__link--favorites">
				<div className="header__favorites">
					{favorites.length === 0 ? (
						<img
							src={HeartIconEmpty}
							alt="Favorites Icon"
							className="header__favorites--icon"
							width="24"
							data-testid="header__favorites--empty"
						/>
					) : (
						<img
							src={HeartIconFill}
							alt="Favorites Icon"
							className="header__favorites--icon"
							width="24"
							data-testid="header__favorites--fill"
						/>
					)}
					<p
						className="header__favorites--count"
						data-testid="header__favorites--count"
					>
						{favorites.length}
					</p>
				</div>
			</Link>
		</div>
	);
};

export default Header;
