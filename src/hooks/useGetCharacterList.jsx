import { useQuery } from "@tanstack/react-query";
import { useCreateURL } from "./useCreateURL";

export const UseGetCharacterList = () => {
  
  const url = useCreateURL();
  
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch(url);
      return (await response.json());
    },
    gcTime: 1000 * 60 * 60 * 24,
  });
}
