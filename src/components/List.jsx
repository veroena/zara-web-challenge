import CharacterCard from "./CharacterCard";
import { UseGetList } from "../hooks/useGetList";
import { Link } from "react-router";
import "./List.scss";

const List = ({data, isError, isPending}) => {

  return (
    <div>
      {isError && <div>Oops! Something went wrong</div>}
      {isPending && <div>Loading...</div>}
      {!isPending && (
         <ol className="list">
          { data.map((item) => 
            <li key={ item.id } className="list__item">
              <Link to={`/${item.name}`}>
                <CharacterCard character={item} />
              </Link>
            </li>
          )}
        </ol>
      )}
    </div>
  );
}

export default List;