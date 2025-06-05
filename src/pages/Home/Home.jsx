import CharacterList from '../../components/CharacterList/CharacterList';
import Header from '../../components/Header/Header';
import Search from '../../components/Search/Search';
import './Home.styles.scss';

const Home = () => {
	return (
		<>
			<Header />
			<div className="layout">
				<Search />
				<CharacterList />
			</div>
		</>
	);
};

export default Home;
