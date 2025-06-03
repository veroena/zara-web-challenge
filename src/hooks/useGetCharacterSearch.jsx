import { useQuery } from "@tanstack/react-query";
import { useCreateURL } from "./useCreateURL";

export const UseGetCharacterSearch = (characterName) => {
  
  const url = useCreateURL(characterName);
  
  return useQuery({
    enabled: false,
    queryKey: ["posts", {characterName}],
    queryFn: async () => {
      const response = await fetch(url);
      return (await response.json());
    },
    gcTime: 1000 * 60 * 60 * 24,
  });
}