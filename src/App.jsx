import './App.scss';
import Layout from './Layout';
import CharacterDetail from './components/CharacterDetail';
import Favorites from './components/Favorites';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { UseGetList } from "./hooks/useGetList";
import { UseGetCharacterSearch } from "./hooks/useGetCharacterSearch";
import { useState } from 'react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState('');
  const { data, isError, isPending } = UseGetList();
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
        <Layout
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
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
