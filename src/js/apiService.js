// function searchImages(data) {
// const BASE_URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${inputValue}&page=2&per_page=12&key=22851319-26dce2435af98d9caa304e2ac`;
// return fetch(`${BASE_URL}&${data}`).then(response => response.json());
// }
// export default searchImages;
export default class NewsApiService {
  constructor() {}
  fetchImages(inputValue) {
    const options = {
      headers: {
        Autorization: '22851319-26dce2435af98d9caa304e2ac',
      },
    };
    const BASE_URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${inputValue}&page=2&per_page=12`;
    return fetch(`${BASE_URL}&${data}`, options)
      .then(response => response.json())
      .then(console.log);
  }
}
