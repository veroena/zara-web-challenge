import '../styles/ComicList.scss';
import { UseGetComicList } from '../hooks/useGetComicList';

const comicList = ({characterId}) => {
  const { data: comicData } = UseGetComicList(characterId);

  const getDate = (arrayDates) => {
    const dateObject = arrayDates.find(date => date.type === 'onsaleDate');
    const date = new Date(dateObject.date).getFullYear();
    return date;
  };

  const orderedData = comicData?.data.results.sort((a, b) => getDate(b.dates) - getDate(a.dates)).slice(0, 12);

  return (
    <div className="comics">
      <div className="comics__container">
        <h3 className="comics__header">COMICS</h3>
        <div className="comics__list--container">
          <ul className="comics__list">
            { orderedData?.map(comic =>
              <li className="comics__list--item" key={ comic.id }>
                { comic.images.length === 0 ?
                  <div className="comics__image--not-found">Cover not found</div>
                  :
                  comic.images.slice(0, 1).map((image, id) =>
                  <img key={id} src={image.path + '.' + image.extension} alt={comic.title} className="comics__image" />
                ) }
                <p className="comics__title">{ comic.title }</p>
                <p className="comics__year">{getDate(comic.dates)}</p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default comicList;
