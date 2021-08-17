import NewsApiService from './js/apiService';
import refs from './js/refs';
import {
  onOpenModalClick,
  onCloseModalClick,
  onClickEsc,
  onClickArrowIconLeft,
  onClickArrowIconRight,
  onArrowKey,
} from './js/modal';
import markupImgTPL from './templates/markup-card.hbs';
import LoadMoreBtn from './js/loadMoreBtn';

import { Error } from '@pnotify/core';
import { notice } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';

import 'material-icons/iconfont/material-icons.css';

// import * as basicLightbox from 'basiclightbox';

// const instance = basicLightbox.create(`
//     <img src="${e.target.dataset.source}" width="800" height="600">
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
  const form = e.currentTarget;
  newsApiService.query = form.elements.query.value;

  if (newsApiService.query === '') {
    return;
  }

  clearImgGallery();

  loadMoreBtn.show();

  newsApiService.resetPage();

  fetchImg();
  // pageScroll();
  form.reset();
}
function renderImgCard(hits) {
  const markup = markupImgTPL(hits);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
function fetchImg() {
  loadMoreBtn.disable();
  if (!newsApiService.query) {
    onError();
    return;
  }

  newsApiService.fetchImages().then(hits => {
    renderImgCard(hits);
    // if (loadMoreBtn.refs.button.disabled) {
    //   onNotice();
    // }
    loadMoreBtn.enable();
  });
  // .catch(onError);
}

function clearImgGallery() {
  refs.gallery.innerHTML = '';
}
function onNotice() {
  notice({
    title: `Loading... Please wait!`,
    delay: 500,
  });
}
function onError(Error) {
  Error;
}

// function pageScroll() {
//   const element = document.querySelectorAll('.gallery-item');
//   console.log(element);
//   element.lastElementChild.scrollIntoView({
//     behavior: 'smooth',
//     block: 'end',
//   });
// }
