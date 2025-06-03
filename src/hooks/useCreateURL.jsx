import md5 from "md5";

const publicKey = import.meta.env.VITE_PUBLIC_KEY;
const privateKey = import.meta.env.VITE_PRIVATE_KEY;
const apiBaseURL = "https://gateway.marvel.com/v1/public";
const initialNumberOfCharacters = 50

export const useCreateURL = (characterName) => {

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
  