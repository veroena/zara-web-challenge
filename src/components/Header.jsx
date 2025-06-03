import { Link } from 'react-router';
import MarvelLogo from '../assets/marvel-logo.png';
import HeartIconEmpty from '../assets/heart-icon-empty.png';
import HeartIconFill from '../assets/heart-icon-fill.svg';
import './Header.scss';

const Header = ({favorites}) => {
  return (
    <div className="header">
      <Link to="/">
        <h1 className="header__title">Marvel</h1>
        <img src={MarvelLogo} alt="Marvel Logo" width="122" />
      </Link>
      <Link to="/favorites">
        <div className="header__favorites">
          { favorites.length === 0 ?
            <img src={ HeartIconEmpty } alt="Favorites Icon" className="header__favorites--icon" width="24" />
            :
            <img src={ HeartIconFill } alt="Favorites Icon" className="header__favorites--icon" width="24" />
          }
          <p className="header__favorites--count">{favorites.length}</p>
        </div>
      </Link>
    </div>
  )
}

export default Header;