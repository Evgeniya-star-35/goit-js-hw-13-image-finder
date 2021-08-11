import NewsApiService from './js/apiService';
import refs from './js/refs';
import markupImgTPL from './templates/markup-card.hbs';
import LoadMoreBtn from './js/loadMoreBtn';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';
var debounce = require('lodash.debounce');
import 'material-icons/iconfont/material-icons.css';

const newsApiService = new NewsApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.searchInput.addEventListener('input', debounce(onSearchImages, 500));
loadMoreBtn.refs.button.addEventListener('click', fetchImg);

function onSearchImages(e) {
  e.preventDefault();
  newsApiService.query = e.target.value;
  loadMoreBtn.show();
  newsApiService.resetPage();
  clearImgGallery();
  fetchImg();
}
function renderImgCard(hits) {
  const markup = markupImgTPL(hits);
  refs.gallery.innerHTML = markup;
}
function fetchImg() {
  loadMoreBtn.disable();
  newsApiService.fetchImages().then(hits => {
    renderImgCard(hits);
    loadMoreBtn.enable();
  });
}
// function onFetchError(Error) {
//   console.log(Error);
// }

function clearImgGallery() {
  refs.gallery.innerHTML = '';
  // newsApiService.emptyPage();
}
