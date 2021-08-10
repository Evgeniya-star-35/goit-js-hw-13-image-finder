import searchImages from './js/apiService';
import refs from './js/refs';
import markupImgTPL from './templates/markup-card.hbs';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';

refs.searchInput.addEventListener('input', onSearchImages);
function onSearchImages(e) {
  e.preventDefault();
  const inputValue = refs.searchInput.value;
  searchImages(inputValue).then(renderImgCard).catch(onFetchError);
}

function renderImgCard(img) {
  const markup = markupImgTPL(img);
  refs.gallery.innerHTML = markup;
}
function onFetchError(Error) {
  console.log(Error);
}
