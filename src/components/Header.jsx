import { Link } from 'react-router';
import MarvelLogo from '../assets/marvel-logo.png';
import HeartIconEmpty from '../assets/heart-icon-empty.png';
import HeartIconFill from '../assets/heart-icon-fill.png';
import './Header.scss';

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <img src={MarvelLogo} alt="Marvel Logo" width="122" />
      </Link>
      <div className="header__favorites">
        <img src={ HeartIconFill } alt="Favorites Icon" className="header__favorites--icon" width="24" />
        {/* <img src={ HeartIconEmpty } alt="Favorites Icon" className="header__favorites--icon" width="24" /> */}
        <p className="header__favorites--count">3</p>
      </div>
    </div>
  )
}

export default Header;