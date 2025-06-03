import HeartIconEmpty from '../assets/heart-icon-empty.png';
import HeartIconFill from '../assets/heart-icon-fill.png';
import './CharacterCard.scss';

const CharacterCard = ({ character }) => {
  return (
    <div className="card">
      <img src={ character.thumbnail.path + '.' + character.thumbnail.extension } alt={ character.name } className="card__img" />
      <div className="card__text-container">
        <p className="card__name">{ character.name }</p>
        <img src={ HeartIconFill } alt="Favorites Icon" className="card__favorites--icon" />
        {/* <img src={ HeartIconEmpty } alt="Favorites Icon" className="card__favorites--icon" /> */}
      </div>
    </div>
  )
};

export default CharacterCard;
