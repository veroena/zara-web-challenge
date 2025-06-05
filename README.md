# Zara Web Challenge

This project is a small application to obtain information about characters from the Marvel Universe.

The user can search characters, see their information, and also add them to a favorites list by clicking the heart icon in the character card.

There are two views: the main one shows a list of 50 characters in alphabetical order or the result of the characters obtained by search. Also, there is a favorites icon at the top of the page that the user can click to show their stored favorite characters. There is also a detailed view of the character when the user clicks one of the cards that shows more information about the character, as well as a list of comics of the character in order of publication date.

The data is obtained from the Marvel API and the requests are handled with [Tanstack Query](https://tanstack.com/query/latest) since it simplifies API calls and offers a lot of advantages like data caching, loading states, error states, retries and even auto-refetching.

To avoid prop drilling, this application uses [Zustand](https://zustand-demo.pmnd.rs/) for its simplicity, speed and easy to use API based on hooks.

The test implementation is done with [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

In the project directory you can run `npm run dev` to run the app in development mode.
