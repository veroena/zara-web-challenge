import md5 from "md5";

const publicKey = import.meta.env.VITE_PUBLIC_KEY;
const privateKey = import.meta.env.VITE_PRIVATE_KEY;
const apiBaseURL = "https://gateway.marvel.com/v1/public";
// const initialNumberOfComics = 12

export const useCreateComicURL = (characterId) => {
  
  const ts = Date.now();
  const hash = md5(ts + privateKey + publicKey)

  const url = `${apiBaseURL}/characters/${characterId}/comics?apikey=${publicKey}&hash=${hash}&ts=${ts}`;

  return url;
};
