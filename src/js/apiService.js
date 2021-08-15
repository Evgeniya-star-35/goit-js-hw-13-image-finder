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
