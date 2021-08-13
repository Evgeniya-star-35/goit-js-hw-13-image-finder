import NewsApiService from './js/apiService';
import refs from './js/refs';
console.log(refs);
import markupImgTPL from './templates/markup-card.hbs';
import LoadMoreBtn from './js/loadMoreBtn';

// import { error } from '@pnotify/core';
// import '@pnotify/core/dist/PNotify.css';
// import '@pnotify/desktop/dist/PNotifyDesktop';
// import '@pnotify/core/dist/BrightTheme.css';
// import * as PNotifyFontAwesome5Fix from '@pnotify/font-awesome5-fix';
// import * as PNotifyFontAwesome5 from '@pnotify/font-awesome5';
// defaultModules.set(PNotifyFontAwesome5Fix, {});
// defaultModules.set(PNotifyFontAwesome5, {});
// defaults.width = '230px';
import 'material-icons/iconfont/material-icons.css';
// const basicLightbox = require('basiclightbox');
import * as basicLightbox from 'basiclightbox';
// const instance = basicLightbox.create(`
//     <img  src="{{largeImageURL}}"  width="800" height="600">
// `);

// instance.show();

const newsApiService = new NewsApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSearchImages);

loadMoreBtn.refs.button.addEventListener('click', fetchImg);

function onSearchImages(e) {
  e.preventDefault();
  newsApiService.query = e.target.elements.query.value.trim();

  if (newsApiService.query === '') {
    return;
  }
  clearImgGallery();
  loadMoreBtn.show();
  newsApiService.resetPage();
  fetchImg();
}
function renderImgCard(hits) {
  const markup = markupImgTPL(hits);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
function fetchImg() {
  loadMoreBtn.disable();
  newsApiService.fetchImages().then(hits => {
    renderImgCard(hits);
    refs.gallery.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
    loadMoreBtn.enable();
  });
  // .catch(onFetchError);
}
// function onFetchError(Error) {
//   console.log(Error);
// }

function clearImgGallery() {
  refs.gallery.innerHTML = '';
  refs.searchForm.value = '';
}

refs.gallery.addEventListener('click', onOpenModalClick);
window.addEventListener('keydown', onClickEsc);
window.addEventListener('click', onCloseModalClick);

function onOpenModalClick(e) {
  const target = e.target;
  if (target.nodeName !== 'IMG') {
    return;
  }
  e.preventDefault();

  if (target.nodeName === 'IMG') {
    refs.modal.classList.add('is-open');
    console.log(refs.modal);
    refs.modalImg.src = target.dataset.source;
    refs.modalImg.alt = target.alt;
    window.addEventListener('keydown', onClickEsc);

    console.log(refs.modalImg);
  }
}
// const onKeyboardClick = e => {
//   if (e.key === 'Escape') {

function onCloseModalClick(e) {
  if (e.target.localName !== 'IMG') {
    refs.modal.classList.remove('is-open');

    refs.modalImg.src = '';
    refs.modalImg.alt = '';
    window.removeEventListener('keydown', onClickEsc);
  }
}
function onClickEsc(e) {
  const ESC_KEY_CODE = 'Escape';
  if (e.code === ESC_KEY_CODE) {
    refs.modal.classList.remove('is-open');
  }
}

// function onModalImgRef(alt, src) {
//   refs.modalImgRef.alt = alt;
//   refs.modalImgRef.src = src;
// }
