import { useQuery } from '@tanstack/react-query';
import { useCreateComicURL } from './useCreateComicURL';

export const UseGetComicList = characterId => {
	const url = useCreateComicURL(characterId);

	return useQuery({
		queryKey: ['posts', { characterId }],
		queryFn: async () => {
			const response = await fetch(url);
			return await response.json();
		},
		gcTime: 1000 * 60 * 60 * 24,
	});
};
