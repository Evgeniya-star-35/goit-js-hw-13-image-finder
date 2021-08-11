import NewsApiService from './js/apiService';
import refs from './js/refs';
import markupImgTPL from './templates/markup-card.hbs';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';
var debounce = require('lodash.debounce');
import 'material-icons/iconfont/material-icons.css';

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
}
function renderImgCard(hits) {
  const markup = markupImgTPL(hits);
  refs.gallery.innerHTML = markup;
}
function onFetchError(Error) {
  console.log(Error);
}
function onLoadMore() {
  newsApiService.fetchImages().then(renderImgCard);
}
function clearImgGallery() {
  refs.gallery.innerHTML = '';
  // newsApiService.emptyPage();
}
