function searchImages(data) {
  const BASE_URL =
    'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=22851319-26dce2435af98d9caa304e2ac';
  return fetch(`BASE_URL`).then(response => console.log(response));
}
export default searchImages;
