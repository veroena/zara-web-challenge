import CharacterCard from "./CharacterCard";
import Header from "./Header";
import { Link } from "react-router";
import './Favorites.scss';

const Favorites = ({ favorites, getFavorite }) => {
  return (
    <>
      <Header favorites={ favorites } />
      <div className="favorites">
        <h2 className="favorites__title">FAVORITES</h2>
        <div className="favorites__list--container">
          <ul className="favorites__list">
            { favorites.length > 0 && favorites?.map(item => 
              <li key={item.id} className="favorites__list--item">
                <Link to={`/${item.name}`}>
                  <CharacterCard character={item} getFavorite={getFavorite} favorites={favorites} />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Favorites;