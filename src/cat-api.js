import axios from 'axios';

export const fetchBreeds = () => {
  axios.defaults.headers.common['x-api-key'] =
    'live_jeE4Tr76cYW7iY8HUUoUGtlRGiapUuxhaUCodHvMeo5NXEsVD8ywEl3DiwQqNOhg';

  return axios.get(`https://api.thecatapi.com/v1/breeds`).then(res => res.data);
};

export const fetchCatByBreed = breedId => {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(res => res.data);
};
