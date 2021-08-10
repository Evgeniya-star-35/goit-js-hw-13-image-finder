// import searchImages from './js/apiService';
import NewsApiService from './js/apiService';
import refs from './js/refs';
import markupImgTPL from './templates/markup-card.hbs';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';
var debounce = require('lodash.debounce');

refs.searchInput.addEventListener('input', debounce(onSearchImages, 500));
refs.btn.addEventListener('click', onLoadMore);

const newsApiService = new NewsApiService();
function onSearchImages(e) {
  e.preventDefault();

  newsApiService.query = e.target.value;
  newsApiService.resetPage();
  newsApiService
    .fetchImages()
    .then(hits => {
      clearImgGallery();
      renderImgCard(hits);
    })
    .catch(onFetchError);
  // searchImages(inputValue).then(renderImgCard).catch(onFetchError);
}
function renderImgCard(hits) {
  const markup = markupImgTPL(hits);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
function onFetchError(Error) {
  console.log(Error);
}
function onLoadMore() {
  newsApiService.fetchImages().then(renderImgCard);
}
function clearImgGallery() {
  refs.gallery.innerHTML = '';
}
