import CharacterList from '../components/CharacterList';
import Search from '../components/Search';
import Header from '../components/Header';
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
