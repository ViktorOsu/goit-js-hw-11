import createMarkup from './templates/create-markup.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

import { ImagesApi } from './js/images-api';

// ImagesAPI.getImages('cat');

const searchFormEl = document.querySelector('.search-form');
const galleryList = document.querySelector('.gallery-list');
const loadMoreBtnEl = document.querySelector('.load-more');

// console.log(loadMoreBtnEl);

const imagesApi = new ImagesApi();

console.log(imagesApi);

const onSearchFormSubmit = event => {
  event.preventDefault();

  const { target: formEl } = event;

  imagesApi.query = formEl.elements.search_query.value;
  imagesApi.page = 1;

  // console.log(imagesApi.query);

  imagesApi
    .fetchPhotosByQuery()
    .then(data => {
      if ((data.query = '')) {
        Notify.warning(`Please, fill the main field'`);
        return;
      }

      if (data.total === 0) {
        galleryList.innerHTML = '';
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        loadMoreBtnEl.classList.add('is-hidden');
        return;
      }

      if (Date.totalHits === 1) {
        galleryList.innerHTML = createMarkup(data.hits);
        loadMoreBtnEl.classList.add('is-hidden');
        return;
      }
      Notify.success(`Hooray! We found ${data.total} images.`);
      galleryList.innerHTML = createMarkup(data.hits);

      loadMoreBtnEl.classList.remove('is-hidden');
      // console.log(data.hits);
    })
    .catch(error => {
      console.log(error);
    });
};

const onLoadMoreBtnClick = event => {
  imagesApi.page += 1;

  imagesApi
    .fetchPhotosByQuery()
    .then(data => {
      galleryList.insertAdjacentHTML('beforeend', createMarkup(data.hits));

      if (imagesApi.page === data.totalHits) {
        loadMoreBtnEl.classList.add('is-hidden');
      }
    })
    .catch(err => {
      console.log(err);
    });
  console.log('Hello');
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);

console.log(imagesApi);
