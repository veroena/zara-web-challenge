import List from "../components/List";
import Search from "../components/Search";
import Header from "../components/Header";
import "../styles/Home.scss";

const Home = ({data, isError, isPending, getSearchTerm, refetch, numberOfResults, searchTerm, resetSearch, getFavorite, favorites}) => {
  
  return (
    <>
      <Header favorites={favorites} />
      <div className="layout">
        <Search searchTerm={searchTerm} getSearchTerm={getSearchTerm} resetSearch={resetSearch} refetch={refetch} numberOfResults={numberOfResults} />
        <List data={ data } isError={ isError } isPending={ isPending } getFavorite={getFavorite} favorites={favorites} />
      </div> 
    </>
  )
};

export default Home;
