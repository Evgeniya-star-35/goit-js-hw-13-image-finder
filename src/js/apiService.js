// function searchImages(data) {
// const BASE_URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${inputValue}&page=2&per_page=12&key=22851319-26dce2435af98d9caa304e2ac`;
// return fetch(`${BASE_URL}&${data}`).then(response => response.json());
// }
// export default searchImages;
export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchImages() {
    console.log(this);
    const BASE_URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=22851319-26dce2435af98d9caa304e2ac`;
    return fetch(BASE_URL)
      .then(response => response.json())
      .then(data => {
        this.incrementPage();
        return data.hits;
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
