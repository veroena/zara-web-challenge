import { useParams } from "react-router";
import HeartIconEmpty from '../assets/heart-icon-empty.png';
import Header from "./Header";
import ComicList from "./ComicList";
import "./CharacterDetail.scss";

const CharacterDetail = ({ data }) => {
  const params = useParams();

  const character = data.find(character => character.name === params.characterName);

  return (
    <>
      <Header />
      <div className="detail">
        <div className="detail__header--container">
          <div className="detail__header">
            <div className="detail__img--container">
              <img src={ character.thumbnail.path + '.' + character.thumbnail.extension } alt={ character.name } className="detail__img" />
            </div>
            <div className="detail__container">
              <div className="detail__container--header">
                <h2 className="detail__title">{ character.name }</h2>
                <img src={ HeartIconEmpty } alt="Favorites Icon" className="detail__favorites--icon" />
              </div>
              <p>{ character.description}</p>
            </div>
          </div>
        </div>
        <ComicList characterId={character.id} />
      </div>
    </>
  )
}

export default CharacterDetail;
