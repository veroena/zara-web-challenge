import md5 from 'md5';

const publicKey = 'fed39f81ba3c865cc68774567de288d7';
const privateKey = '8c8a356ef5a584b7016ff6c3cf1f86fafce5f1aa';
const apiBaseURL = 'https://gateway.marvel.com/v1/public';

export const useCreateComicURL = characterId => {
	const ts = Date.now();
	const hash = md5(ts + privateKey + publicKey);

	const url = `${apiBaseURL}/characters/${characterId}/comics?apikey=${publicKey}&hash=${hash}&ts=${ts}`;

	return url;
};
