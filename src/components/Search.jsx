import '../styles/Search.scss';

const Search = ({
	numberOfResults,
	refetch,
	getSearchTerm,
	searchTerm,
	resetSearch,
}) => {
	const handleSubmit = event => {
		event.preventDefault();
		refetch();
	};

	const handleChange = event => {
		getSearchTerm(event.target.value);
	};

	const handleReset = () => {
		if (searchTerm !== '') resetSearch();
	};

	return (
		<>
			<form
				className="search"
				onSubmit={handleSubmit}
				data-testid="search__form"
			>
				<input
					type="text"
					name="search characters"
					className="search__bar"
					placeholder="Search a character..."
					onChange={handleChange}
					value={searchTerm}
					onClick={() => handleReset()}
					data-testid="search__bar"
				/>
				<p className="search__results" data-testid="search__results">
					{numberOfResults} results
				</p>
			</form>
		</>
	);
};

export default Search;
