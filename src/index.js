import createMarkup from './templates/create-markup.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { successInfo, specificInfo, warningInfo } from './js/notify';

import { ImagesApi } from './js/images-api';

const searchFormEl = document.querySelector('.search-form');
const galleryList = document.querySelector('.gallery-list');
const loadMoreBtnEl = document.querySelector('.load-more');
const intersectionTargetEl = document.querySelector('.observer');

const imagesApi = new ImagesApi();
let isShow = 0;

loadMoreBtnEl.classList.add('is-hidden');

const observer = new IntersectionObserver(
  (entries, observer) => {
    if (entries[0].isIntersecting) {
      imagesApi.page += 1;

      imagesApi.fetchPhotosByQuery().then(data => {
        galleryList.insertAdjacentHTML('beforeend', createMarkup(data.hits));

        let gallery = new SimpleLightbox('.gallery a', {
          captionsData: 'alt',
          captionDelay: 250,
        });

        gallery.refresh();

        const { height: cardHeight } = document
          .querySelector('.gallery')
          .firstElementChild.getBoundingClientRect();

        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });

        if (imagesApi.page === data.totalHits) {
          observer.unobserve(intersectionTargetEl);
        }
      });
    }
  },
  {
    root: null,
    rootMargin: '0px 0px 100px 0px',
    threshold: 1,
  }
);

const onSearchFormSubmit = async event => {
  event.preventDefault();

  const { target: formEl } = event;

  imagesApi.query = formEl.elements.search_query.value;
  imagesApi.page = 1;

  isShow += 40;
  try {
    const data = await imagesApi.fetchPhotosByQuery();

    if ((data.query = '')) {
      warningInfo();
      // Notify.warning(`Please, fill the main field'`);
      return;
    }

    if (data.total === 0) {
      galleryList.innerHTML = '';
      // loadMoreBtnEl.classList.add('is-hidden');
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      // loadMoreBtnEl.classList.add('is-hidden');
      return;
    }

    console.log(data.totalHits);

    if (data.totalHits === 1) {
      galleryList.innerHTML = createMarkup(data.hits);
      gallery.refresh();
      // loadMoreBtnEl.classList.add('is-hidden');
      return;
    }

    // loadMoreBtnEl.classList.remove('is-hidden');
    successInfo(data);
    // Notify.success(`Hooray! We found ${data.totalHits} images.`);
    galleryList.innerHTML = createMarkup(data.hits);

    gallery.refresh();

    // loadMoreBtnEl.classList.remove('is-hidden');

    setTimeout(() => {
      observer.observe(intersectionTargetEl);
    }, 300);

    if (isShow >= data.totalHits) {
      console.log(isShow);
      // loadMoreBtnEl.classList.add('is-hidden');
      specificInfo();
      // Notify.info(`We're sorry, but you've reached the end of search results.`);
    }
    console.log(data);
  } catch (error) {
    Notify.failure(error.message);
  }
};

// const onLoadMoreBtnClick = async event => {
//   imagesApi.page += 1;

//   console.log(isShow);

//   try {
//     const data = await imagesApi.fetchPhotosByQuery();

//     galleryList.insertAdjacentHTML('beforeend', createMarkup(data.hits));

//     let gallery = new SimpleLightbox('.gallery a', {
//       captionsData: 'alt',
//       captionDelay: 250,
//     });

//     gallery.refresh();
//   } catch (error) {
//     console.log(err);
//   }
// };

let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

searchFormEl.addEventListener('submit', onSearchFormSubmit);
// loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
