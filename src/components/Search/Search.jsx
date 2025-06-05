import { UseGetCharacterList } from '../../hooks/useGetCharacterList';
import { UseGetCharacterSearch } from '../../hooks/useGetCharacterSearch';
import { useSearchStore } from '../../store/store';
import './Search.styles.scss';

const Search = () => {
	const { searchTerm, setSearchTerm, resetSearch } = useSearchStore();
	const { data: searchData, refetch } = UseGetCharacterSearch(searchTerm);
	const { data } = UseGetCharacterList();

	const numberOfResults =
		searchData === undefined
			? data?.data.results.length
			: searchData?.data.results.length;

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
					onChange={event => setSearchTerm(event.target.value)}
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
