import { useQuery } from "@tanstack/react-query";
import md5 from "md5";

const publicKey = 'fed39f81ba3c865cc68774567de288d7';
const privateKey = '8c8a356ef5a584b7016ff6c3cf1f86fafce5f1aa';
const apiBaseURL = "https://gateway.marvel.com/v1/public";
const initialNumberOfCharacters = 50

export const UseGetList = () => {
  // const [search, setSearch] = useState("");
  const createURL = () => {
    const limit = `limit=${initialNumberOfCharacters}&`;
    const ts = Date.now();
    const params = new URLSearchParams({
      ts: ts,
      apikey: publicKey,
      hash: md5(ts + privateKey + publicKey),
    });
    const endpoint = `${apiBaseURL}/characters?`;

    const url = endpoint + limit + params;

    return url;
  };
  
  const url = createURL();
  
  return useQuery({
    queryKey: ["posts"],
    // Include parameter search for next iteration so it performs a fetch only when the search parameter changes
    // queryKey: ["posts", { search }],
    queryFn: async () => {
      const response = await fetch(url);
      return (await response.json());
    },
    gcTime: 1000 * 60 * 60 * 24,
    // staleTime: Infinity,
    // cacheTime: 0,
  });
}