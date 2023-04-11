import axios from 'axios';
import { Notify } from 'notiflix';

export class ImagesApi {
  static BASE_URL = 'https://pixabay.com/api/';
  static API_KEY = '35200671-7af045ac24191cf7c9239d52b';

  constructor() {
    this.query = null;
    this.page = 1;
  }

  async fetchPhotosByQuery() {
    const searchParams = new URLSearchParams({
      page: this.page,
      q: this.query,
      per_page: 40,
      image_type: 'photo',
      orientation: 'horisontal',
      safesearch: true,
      key: ImagesApi.API_KEY,
    });

    const URL = `${ImagesApi.BASE_URL}?${searchParams}`;
    const response = await axios.get(URL);
    const result = response.data;
    return result;
  }
}
