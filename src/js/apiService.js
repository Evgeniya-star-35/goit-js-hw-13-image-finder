import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';
import { notice } from '@pnotify/core';
import axios from 'axios';

// import PNotifyButtons from '../node_modules/pnotify/dist/es/PNotifyButtons.js';

const API_KEY = '22851319-26dce2435af98d9caa304e2ac';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    // console.log(this);
    const BASE_URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
    return fetch(BASE_URL)
      .then(response => response.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      });
  }
  async getPics() {
    const BASE_URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`; // const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.word}&page=${this.page}&per_page=12&key=${this.api_key}`;

    try {
      const pics = await axios.get(BASE_URL);
      return pics.data;
    } catch (err) {
      notice({
        title: 'Request failed',
        text: 'Try again',
      });
      console.log(err);
    }
  }

  async returnData() {
    const pics = await this.getPics();

    return pics.hits.map(pic => {
      return {
        webformatURL: pic.webformatURL,
        largeImageURL: pic.largeImageURL,
        likes: pic.likes,
        views: pic.views,
        comments: pic.comments,
        downloads: pic.downloads,
      };
    });
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}
