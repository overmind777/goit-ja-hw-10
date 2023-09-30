import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  select: document.querySelector('.breed-select'),
  textLoader: document.querySelector('.loader'),
  textError: document.querySelector('.error'),
  catContainer: document.querySelector('.cat-info'),
};

refs.textLoader.style.display = 'none';
refs.textError.style.display = 'none';
refs.select.style.display = 'none';
refs.catContainer.style.display = 'none';

Loading.dots({
  svgColor: '#5897fb',
  svgSize: '130px',
  messageFontSize: '30px',
});

refs.select.addEventListener('change', onChangeSelect);

fetchBreeds()
  .then(data => {
    refs.select.style.display = 'flex';
    refs.textLoader.style.display = 'none';
    refs.select.insertAdjacentHTML('beforeend', createSelectMurkup(data));
    new SlimSelect({
      select: refs.select,
    });
  })
  .catch(err => Notify.failure(refs.textError.textContent))
  .finally(res => Loading.remove());

function onChangeSelect(e) {
  const idCatImg = e.target.value;

  Loading.dots({
    svgColor: '#5897fb',
    svgSize: '130px',
    messageFontSize: '30px',
  });

  fetchCatByBreed(idCatImg)
    .then(data => {
      refs.catContainer.style.display = 'flex';
      refs.catContainer.innerHTML = createCatMarkup(data);
    })
    .catch(err => Notify.failure(refs.textError.textContent))
    .finally(res => Loading.remove());
}

function createSelectMurkup(arr) {
  return arr
    .map(name => {
      return `<option value="${name['id']}">${name['name']}</option>`;
    })
    .join('');
}

function createCatMarkup(arr) {
  return `<img class="cat-img" src="${arr.url}" alt="${arr.breeds[0].name}" width="300" height="300" >
       <div class="cat-right">
      <h1 class="name">${arr.breeds[0].name}</h1>
      <p class="description">${arr.breeds[0].description}</p>
      <p class="temperament"><span class="temperament-span">Temperament:</span> ${arr.breeds[0].temperament}</p>
      </div>`;
}
