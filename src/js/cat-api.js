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

const BASE_URL = 'https://api.thecatapi.com/v1';

axios.defaults.headers.common['x-api-key'] = API_KEY;

export function fetchBreeds() {
  return axios.get(`${BASE_URL}/breeds`).then(response => {
    return response.data;
  });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(response => {
      return response.data[0];
    });
}
