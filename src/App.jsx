import './styles/App.scss';
import Home from './pages/Home';
import CharacterDetail from './pages/CharacterDetail';
import Favorites from './pages/Favorites';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { UseGetCharacterList } from "./hooks/useGetCharacterList";
import { UseGetCharacterSearch } from "./hooks/useGetCharacterSearch";
import { useState } from 'react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState('');
  const { data, isError, isPending } = UseGetCharacterList();
  const { data: searchData, refetch } = UseGetCharacterSearch(searchTerm);

  const getSearchTerm = (value) => {
    setSearchTerm(value);
  };

  const resetSearch = () => {
    setSearchTerm('')
  };

  const getFavorite = (e, value) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorites.length > 0 ) {
      const index = favorites?.findIndex((item) => item?.id === value?.id);
      if (index !== -1) {
        const filteredFaves = favorites?.filter((_, i) => i !== index)
        setFavorites(filteredFaves);
      } else {
        setFavorites([...favorites, value]);
      }
    } else {
      setFavorites([...favorites, value]);
    } 
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element:
        <Home
          data={ searchData === undefined ? data?.data.results : searchData?.data.results }
          isError={ isError }
          isPending={ isPending }
          getSearchTerm={ getSearchTerm }
          searchTerm={ searchTerm }
          resetSearch={resetSearch}
          refetch={ refetch }
          numberOfResults={ searchData === undefined ? data?.data.results.length : searchData?.data.results.length }
          getFavorite={ getFavorite }
          favorites={favorites}
        />,
      errorElement: <div>Oops! Something went bad...</div>
    },
    {
      path: '/:characterName',
      element:
        <CharacterDetail
          data={ searchData === undefined ? data?.data.results : searchData?.data.results }
          favorites={ favorites }
          getFavorite={ getFavorite }
        />
    },
    {
      path: '/favorites',
      element:
        <Favorites
          favorites={ favorites }
          numberOfResults={ favorites.length }
          getFavorite={ getFavorite }
        />
    }
  ])
  
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
