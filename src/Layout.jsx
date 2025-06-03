import List from "./components/List";
import Search from "./components/Search";
import Header from "./components/Header";
import "./Layout.scss";

const Layout = ({data, isError, isPending, getSearchTerm, refetch, numberOfResults, searchTerm, resetSearch}) => {
  
  return (
    <>
      <Header />
      <div className="layout">
        <Search searchTerm={searchTerm} getSearchTerm={getSearchTerm} resetSearch={resetSearch} refetch={refetch} numberOfResults={numberOfResults} />
        <List data={ data } isError={ isError } isPending={ isPending } />
      </div> 
    </>
  )
};

export default Layout;
