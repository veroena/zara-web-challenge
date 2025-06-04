import "../styles/Search.scss";

const Search = ({ numberOfResults, refetch, getSearchTerm, searchTerm, resetSearch }) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    refetch();
  }
  
  const handleChange = (event) => {
    getSearchTerm(event.target.value)
  };

  const handleReset = () => { 
    if (searchTerm !== '') resetSearch()
  }

  return (
    <>
      <form className="search" onSubmit={handleSubmit}>
        <input type="text" name="search characters" className="search__bar" placeholder="Search a character..." onChange={handleChange} value={searchTerm} onClick={() => handleReset()} />
        <p className="search__results">{numberOfResults} results
        </p>
      </form>
    </>
  )
}

export default Search;
