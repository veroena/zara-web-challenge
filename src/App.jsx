import './App.scss';
import Layout from './Layout';
import CharacterDetail from './components/CharacterDetail';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { UseGetList } from "./hooks/useGetList";
import { UseGetCharacterSearch } from "./hooks/useGetCharacterSearch";
import { UseGetComicList } from "./hooks/useGetComicList";
import { useState } from 'react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isError, isPending } = UseGetList();
  const { data: searchData, refetch } = UseGetCharacterSearch(searchTerm);

  const getSearchTerm = (value) => {
    setSearchTerm(value);
  };

  const resetSearch = () => {
    setSearchTerm('')
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
          numberOfResults={searchData === undefined ? data?.data.results.length : searchData?.data.results.length}
        />,
      errorElement: <div>Oops! Something went bad...</div>
    },
    {
      path: '/:characterName',
      element:
        <CharacterDetail
          data={ searchData === undefined ? data?.data.results : searchData?.data.results }
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
