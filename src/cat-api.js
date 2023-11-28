// import libraria axios pentru a face HTTP requests
import axios from 'axios';
import { Notify } from 'notiflix';
// setez cheia default pentru toate requests
axios.defaults.headers.common['x-api-key'] =
  'live_JE59uD8OTUqSszjbdft41Wp8DtIwAPvrfvOYWDevVVdYZ6oJzSl4NqcMwkHxSMBk';

function showFetchError() {
  Notify.failure('Oops! Something went wrong! Try reloading the page!');
}

const selectEl = document.querySelector('.breed-select');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

function showElement(el) {
  el.style.display = 'block';
}

function hideElement(el) {
  el.style.display = 'none';
}
// Initial state: hide selectEl and show loaderEl, hide errorEl
hideElement(selectEl);
showElement(loaderEl);
errorEl.innerHTML = '';
loaderEl.innerHTML = '';

// Delay the appearance of selectEl and hide loaderEl after 2 seconds
setTimeout(function () {
  showElement(selectEl);
  hideElement(loaderEl);
}, 1000);

// function pentru fetchBreeds
function fetchBreeds() {
  // fa un request pentru a primi rasele de pisici
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching cat:', error);
      showFetchError();
      // return [];
    });
}
// function pentru fetch imagini by breed
function fetchCatByBreed(breed) {
  // actualizam url pentru a include identificatorul rasei
  const apiUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${breed}`;
  return axios
    .get(apiUrl)
    .then(response => response.data[0])
    .catch(error => {
      console.error('Error fetching cat:', error);
      showFetchError();
      // return null;
    });
}
export {
  fetchBreeds,
  fetchCatByBreed,
  showElement,
  hideElement,
  showFetchError,
};
