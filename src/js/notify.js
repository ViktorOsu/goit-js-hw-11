import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function successInfo(data) {
  Notify.success(`Hooray! We found ${data.totalHits} images.`);
}

export function specificInfo() {
  Notify.info(`We're sorry, but you've reached the end of search results.`);
}

export function warningInfo() {
  Notify.warning(`Please, fill the main field'`);
}
