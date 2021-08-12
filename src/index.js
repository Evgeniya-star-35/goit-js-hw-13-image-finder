import NewsApiService from './js/apiService';
import refs from './js/refs';
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
// import * as basicLightbox from 'basiclightbox';
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

const onOpenModalClick = e => {
  e.preventDefault();

  if (e.target.nodeName === 'img') {
    onModalImgRef(e.target.alt, e.target.dataset.source);

    refs.modalRef.classList.add('is-open');
  }
};
const onKeyboardClick = e => {
  if (e.key === 'Escape') {
    refs.modalRef.classList.remove('is-open');
  }
};

const onCloseModalClick = e => {
  if (e.target.localName !== 'img') {
    refs.modalRef.classList.remove('is-open');

    onModalImgRef('', '');
  }
};
function onModalImgRef(alt, src) {
  refs.modalImgRef.alt = alt;
  refs.modalImgRef.src = src;
}

refs.gallery.addEventListener('click', onOpenModalClick);
window.addEventListener('keyup', onKeyboardClick);
window.addEventListener('click', onCloseModalClick);
