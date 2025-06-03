import HeartIconEmpty from '../assets/heart-icon-empty.png';
import HeartIconFill from '../assets/heart-icon-fill.svg';
import './CharacterCard.scss';

const CharacterCard = ({ character, getFavorite, favorites }) => {

  const getHeart = (list, char) => {
    const find = list.some(item => item.id === char.id);
    if (find) {
      return <img src={ HeartIconFill } alt="Favorites Icon" className="card__favorites--icon fill" />
    } else {
      return <img src={ HeartIconEmpty } alt="Favorites Icon" className="card__favorites--icon" />
    }
  }

  return (
    <div className="card">
      <img src={ character.thumbnail.path + '.' + character.thumbnail.extension } alt={ character.name } className="card__img" />
      <div className="card__text-container">
        <p className="card__name">{ character.name }</p>
        <button className="card__favorites--button" onClick={ (e) => getFavorite(e, character) }>
          { favorites.length > 0 ?
            getHeart(favorites, character)
            :
            <img src={ HeartIconEmpty } alt="Favorites Icon" className="card__favorites--icon" />
          }
        </button>
      </div>
    </div>
  )
};

export default CharacterCard;
