import { useParams } from "react-router";
import HeartIconEmpty from '../assets/heart-icon-empty.png';
import HeartIconFill from '../assets/heart-icon-fill.svg';
import Header from "../components/Header";
import ComicList from "../components/ComicList";
import "../styles/CharacterDetail.scss";

const CharacterDetail = ({ data, favorites, getFavorite }) => {
  const params = useParams();

  
  const character = data.find(character => character.name === params.characterName);
  // const characterFromFavorites = favorites.length > 0 && favorites.find(character => character.name === params.characterName);

  
  const getHeart = (list, char) => {
    const find = list.some(item => item.id === char.id);
    if (find) {
      return <img src={ HeartIconFill } alt="Favorites Icon" className="detail__favorites--icon fill" data-testid="favorites__icon--fill" />
    } else {
      return <img src={ HeartIconEmpty } alt="Favorites Icon" className="detail__favorites--icon" data-testid="favorites__icon--empty" />
    }
  }

  // TODO implement character detail from a searched character the user has added to favorites
  // const currentCharacter = () => {
  //   if (character !== undefined) {
  //     return character;
  //   } else {
  //     return characterFromFavorites;
  //   } 
  // }

  return (
    <>
      <Header favorites={favorites} />
      <div className="detail">
        <div className="detail__header--container">
          <div className="detail__header">
            <div className="detail__img--container">
              <img
                src={ character.thumbnail.path + '.' + character.thumbnail.extension }
                alt={ character.name }
                className="detail__img"
                data-testid="detail__img"
              />
            </div>
            <div className="detail__container">
              <div className="detail__container--header">
                <h2 className="detail__title" data-testid="detail__title">{ character.name }</h2>
                <button className="detail__favorites--button" onClick={ (e) => getFavorite(e, character) }>
                  { favorites.length > 0 ?
                    getHeart(favorites, character)
                    :
                    <img src={ HeartIconEmpty } alt="Favorites Icon" className="detail__favorites--icon" data-testid="favorites__icon--empty" />
                  }
                  </button>
              </div>
              <p className="detail__description" data-testid="detail__description">{ character.description}</p>
            </div>
          </div>
        </div>
        <ComicList characterId={character.id} />
      </div>
    </>
  )
}

export default CharacterDetail;
