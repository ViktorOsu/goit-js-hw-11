import axios from 'axios';
import { Notify } from 'notiflix';

export class ImagesApi {
  static BASE_URL = 'https://pixabay.com/api/';
  static API_KEY = '35200671-7af045ac24191cf7c9239d52b';

  constructor() {
    this.query = null;
    this.page = 1;
  }

  fetchPhotosByQuery() {
    const searchParams = new URLSearchParams({
      page: this.page,
      q: this.query,
      per_page: 40,
      image_type: 'photo',
      orientation: 'horisontal',
      safesearch: true,
      key: ImagesApi.API_KEY,
    });

    return fetch(`${ImagesApi.BASE_URL}?${searchParams}`).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    });
    // .then(data => {
    //   console.log(data);
    // })
    // .catch(error => {
    //   console.log(error);
    // });
  }
}

// export class ImagesAPI {
//   static BASE_URL = 'https://pixabay.com/api/';
//   static #API_KEY = '35200671-7af045ac24191cf7c9239d52b';

//   constuctor() {
//     this.query = null;
//     this.page = 1;
//   }

//   async fetchGetImages(query) {
//     const searchParams = new URLSearchParams({
//       page: this.page,
//       q: this.query,
//       per_page: 40,
//       image_type: 'photo',
//       orientation: 'horisontal',
//       safesearch: true,
//       key: ImagesAPI.#API_KEY,
//     });

//     return fetch(`${ImagesAPI.BASE_URL}?${searchParams}`).then(response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }

//       return response.json();
//     });
//   }
// }

// ===================================================================

// https://pixabay.com/api/?
// key = 35200671 - 7af045ac24191cf7c9239d52b;
// q = cat;
// image_type = photo;
// orientation = horisontal;
// safesearch = true;
