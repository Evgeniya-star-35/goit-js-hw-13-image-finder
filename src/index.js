// import searchImages from './js/apiService';
import NewsApiService from './js/apiService';
import refs from './js/refs';
import markupImgTPL from './templates/markup-card.hbs';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';

refs.searchInput.addEventListener('input', onSearchImages);
refs.btn.addEventListener('click', onLoadMore);

let inputValue = '';
const newsApiService = new NewsApiService();
function onSearchImages(e) {
  e.preventDefault();
  const inputValue = e.currentTarget.elements.query.value;
  newsApiService.fetchImages(inputValue);
  // searchImages(inputValue).then(renderImgCard).catch(onFetchError);
}
function renderImgCard(img) {
  const markup = markupImgTPL(img);
  console.log(markup);
  refs.gallery.innerHTML = markup;
}
function onFetchError(Error) {
  console.log(Error);
}
function onLoadMore() {
  newsApiService.fetchImages(inputValue);
}
