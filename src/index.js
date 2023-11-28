import {
  fetchBreeds,
  fetchCatByBreed,
  hideElement,
  showElement,
  showFetchError,
} from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const selectEl = document.querySelector('.breed-select');
const loaderEl = document.querySelector('.loader');
const catInfoEl = document.querySelector('.cat-info');

// hideElement(errorEl);
debugger;
let slimselect = new SlimSelect({
  select: selectEl,
  events: {
    afterChange: option => {
      // Clearing cat info and handling placeholder case
      catInfoEl.innerHTML = '';
      if (option.length === 0 || option[0].text === 'Select a breed') {
        return;
      }
      showBreed(option[0].value);
    },
  },
});
// Fetch cat breeds and populate SlimSelect
fetchBreeds()
  .then(data => {
    // Show loader, prepare data for SlimSelect, and set the data
    showElement(loaderEl);
    const dataSlimSelect = [{ placeholder: true, text: 'Select a breed' }];
    data.forEach(cat => {
      dataSlimSelect.push({ text: cat.name, value: cat.id });
    });
    slimselect.setData(dataSlimSelect);
  })
  .catch(showFetchError)
  .finally(() => {
    // Hide loader after fetching breeds
    hideElement(loaderEl);
  });

function showBreed(breed) {
  fetchCatByBreed(breed)
    .then(data => {
      // Hide cat info, show loader, and update cat info HTML
      hideElement(catInfoEl);
      showElement(loaderEl);
      const { url, breeds } = data[0];
      catInfoEl.innerHTML = `<img src="${url}" alt="${breeds[0].name}" width="400"/>
            <div class="cat-file">
                <h2>${breeds[0].name}</h2>
                <p>${breeds[0].description}</p>
                <p><strong>Temperament:</strong> ${breeds[0].temperament}</p>
            </div>`;
    })
    .catch(showFetchError)
    .finally(() => {
      // Hide loader and show cat info
      hideElement(loaderEl);
      showElement(catInfoEl);
    });
}
