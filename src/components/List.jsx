import CharacterCard from "./CharacterCard";
import { Link } from "react-router";
import "../styles/List.scss";

const List = ({data, isError, isPending, getFavorite, favorites}) => {

  return (
    <div>
      {isError && <div>Oops! Something went wrong</div>}
      {isPending && <div>Loading...</div>}
      {!isPending && (
        <ul className="list">
          { data.map((item) => 
            <li key={ item.id } className="list__item">
              <Link to={`/${item.name}`}>
                <CharacterCard character={item} getFavorite={getFavorite} favorites={favorites} />
              </Link>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

export default List;