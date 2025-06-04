import '../styles/Search.scss';
import { useSearchStore } from '../store';
import { UseGetCharacterSearch } from '../hooks/useGetCharacterSearch';


const Search = ({
	numberOfResults,
}) => {
	const { searchTerm, setSearchTerm, resetSearch } = useSearchStore((state) => state)
	const { refetch } = UseGetCharacterSearch(searchTerm);
	
	const handleSubmit = event => {
		event.preventDefault();
		refetch();
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
					onChange={(event) => setSearchTerm(event.target.value)}
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
