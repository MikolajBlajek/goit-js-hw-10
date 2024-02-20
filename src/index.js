import { fetchBreeds, fetchCatByBreed } from './cat-api'; 
import SlimSelect from 'slim-select'

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error'); // Dodajemy error  

loader.style.display = 'none'; 
error.style.display = 'none'

try {
  fetchBreeds().then(data => renderSelect(data));
} catch (error) {
  console.log(error);
}

function renderSelect(breeds) {
  const markup = breeds
    .map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join('');
  breedSelect.insertAdjacentHTML('beforeend', markup);
}

breedSelect.addEventListener('change', e => {
  loader.style.display = 'block'; // Pokaż loader podczas pobierania danych
  error.style.display = 'none'; // Ukryj error
  fetchCatByBreed(e.target.value)
    .then(data => renderCat(data[0]))
    .catch(err => {
      console.error(err);
      error.style.display = 'block'; // Pokaż error w przypadku błędu
      loader.style.display = 'none'; // Ukryj loader
    });
});

function renderCat(catData) {
  const { url } = catData;
  const { description, name, temperament } = catData.breeds[0];
  catInfo.innerHTML = ''; // Czyszczenie poprzednich informacji o kocie
  catInfo.insertAdjacentHTML(
    'beforeend',
    `<div>
        <h2>${name}</h2> 

          <img class="cat_photo" src="${url}" alt="${name}" />  

        <div class="text_box">
          <p class="cat_text">${description}</p>
          <p class="cat_temperament"><strong>Temperament:</strong> ${temperament}</p> 
        </div>
    </div>`
  );

  loader.style.display = 'none'; // Ukrycie loadera po zakończeniu generowania informacji o kocie
  error.style.display = 'none'; // Ukryj error po wyrenderowaniu kota
}