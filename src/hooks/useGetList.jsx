import { useQuery } from "@tanstack/react-query";
import { useCreateURL } from "./useCreateURL";

export const UseGetList = () => {
  // const [search, setSearch] = useState("");
  
  const url = useCreateURL();
  
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