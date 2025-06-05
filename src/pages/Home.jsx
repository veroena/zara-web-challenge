import CharacterList from '../components/CharacterList';
import Header from '../components/Header';
import Search from '../components/Search';
import '../styles/Home.scss';

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
