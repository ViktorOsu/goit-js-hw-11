import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function specificInfo() {
  Notify.info('Too many matches found. Please enter a more specific name.');
}

export function onFetchError() {
  Notify.failure(
    `Sorry, there are no images matching your search query. Please try again`
  );
}
