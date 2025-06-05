import md5 from 'md5';

const publicKey = 'fed39f81ba3c865cc68774567de288d7';
const privateKey = '8c8a356ef5a584b7016ff6c3cf1f86fafce5f1aa';
const apiBaseURL = 'https://gateway.marvel.com/v1/public';
const initialNumberOfCharacters = 50;

export const useCreateURL = characterName => {
	const limit = `limit=${initialNumberOfCharacters}&`;
	const ts = Date.now();
	const params = new URLSearchParams({
		ts: ts,
		apikey: publicKey,
		hash: md5(ts + privateKey + publicKey),
	});
	const endpoint = `${apiBaseURL}/characters?`;
	const characterNameString = `&nameStartsWith=${characterName}`;

	if (characterName) {
		const url = endpoint + limit + params + characterNameString;
		return url;
	} else {
		const url = endpoint + limit + params;
		return url;
	}
};
