// import libraria axios pentru a face HTTP requests
import axios from 'axios';
import { Notify } from 'notiflix';
// setez cheia default pentru toate requests
axios.defaults.headers.common['x-api-key'] =
  'live_JE59uD8OTUqSszjbdft41Wp8DtIwAPvrfvOYWDevVVdYZ6oJzSl4NqcMwkHxSMBk';

function showFetchError() {
  Notify.failure('Oops! Something went wrong! Try reloading the page!');
}

function showElement(el) {
  el.style.display = 'block';
}

function hideElement(el) {
  el.style.display = 'none';
}

// function pentru fetchBreeds
function fetchBreeds() {
  // fa un request pentru a primi rasele de pisici
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(showFetchError);
}
// function pentru fetch imagini by breed
function fetchCatByBreed(breedId) {
  // actualizam url pentru a include identificatorul rasei
  const apiUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios
    .get(apiUrl)
    .then(response => response.data[0])
    .catch(showFetchError);
}
export {
  fetchBreeds,
  fetchCatByBreed,
  showElement,
  hideElement,
  showFetchError,
};
