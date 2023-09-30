//'https://api.thecatapi.com/v1/breeds'
//https://api.thecatapi.com/v1/images/search?breed_ids=ідентифікатор_породи

//? Version 1.0
// export function fetchBreeds() {
//   const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
//   return fetch(`${BASE_URL}`).then(resp => {
//     if (!resp.ok) {
//       throw new Error(resp.statusText);
//     }
//     return resp.json();
//   });
// }

// export function fetchCatByBreed(breedId) {
//   const ID_REQUEST = 'https://api.thecatapi.com/v1/images/search?breed_ids=';
//   return fetch(`${ID_REQUEST}${breedId}`).then(resp => {
//     if (!resp.ok) {
//       throw new Error(resp.statusText);
//     }
//     return resp.json();
//   });
// }

//? Version 2.0
import axios, { Axios } from 'axios';

const API_KEY =
  'live_t7hvFY2wyGskGlHcbSlJCijyt9wCWNlGwztdmq7Up8qt8DFFkQCNMfS04VKri8hQ';

axios.defaults.headers.common['x-api-key'] = API_KEY;

function fetchBreeds() {
  const BASE_URL = `https://api.thecatapi.com/v1/breeds`;
  return axios.get(BASE_URL).then(response => {
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.data;
  });
}

function fetchCatByBreed(breedId) {
  const ID_REQUEST = 'https://api.thecatapi.com/v1/images/search?breed_ids';
  return axios.get(`${ID_REQUEST}=${breedId}`).then(response => {
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.data[0];
  });
}

export { fetchBreeds, fetchCatByBreed };
