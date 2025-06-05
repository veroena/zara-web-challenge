import { Link } from 'react-router';
import { useFavoriteStore } from '../../store/store';
import MarvelLogo from '../../assets/marvel-logo.png';
import HeartIconEmpty from '../../assets/heart-icon-empty.png';
import HeartIconFill from '../../assets/heart-icon-fill.svg';
import './Header.styles.scss';

const Header = () => {
	const { favorites } = useFavoriteStore(state => state);
	return (
		<header className="header">
			<h1 className="header__title" aria-label="Zara Web Challenge">
				Zara Web Challenge
			</h1>
			<nav className="header__container">
				<Link to="/" data-testid="header__link--marvel">
					<img
						src={MarvelLogo}
						alt="Marvel Logo"
						width="122"
						data-testid="marvel__logo"
					/>
				</Link>
				<Link
					to="/favorites"
					data-testid="header__link--favorites"
					className="header__favorites"
				>
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
				</Link>
			</nav>
		</header>
	);
};

export default Header;
