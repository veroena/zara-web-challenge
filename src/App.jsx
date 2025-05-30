import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import List from "./List";


const App = () => {
  
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={ queryClient }>
      <h1>Marvel Characters</h1>
      <List />
    </QueryClientProvider>
  )
}

export default App
