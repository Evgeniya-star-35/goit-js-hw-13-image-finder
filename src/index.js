import NewsApiService from './js/apiService';
import refs from './js/refs';
import { onOpenModalClick, onCloseModalClick, onClickEsc } from './js/modal';
import markupImgTPL from './templates/markup-card.hbs';
import LoadMoreBtn from './js/loadMoreBtn';

import { Error } from '@pnotify/core';
import { notice } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';

import 'material-icons/iconfont/material-icons.css';

import * as basicLightbox from 'basiclightbox';

// const instance = basicLightbox.create(`
//     <img src="e.target.dataset.source" width="800" height="600">
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
  pageScroll();
  newsApiService.resetPage();

  fetchImg();

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
    if (loadMoreBtn.refs.button.disabled) {
      onNotice();
    }
    loadMoreBtn.enable();
  });
  // .catch(onFetchError);
}
// function onFetchError(Error) {
//   console.log(Error);
// }

function clearImgGallery() {
  refs.gallery.innerHTML = '';
}
function onNotice() {
  notice({
    title: `Loading... Please wait!`,
    delay: 500,
  });
}
function onError() {
  Error({
    title: `Something went wront. Please try again!`,
    delay: 350,
  });
}

function pageScroll() {
  newsApiService.incrementPage();
  newsApiService.returnData();
  window.scrollTo({
    top: refs.gallery.scrollHeight,
    behavior: 'smooth',
  });
}

loadMoreBtn.refs.button.addEventListener('click', pageScroll);

///////////////////////intersection observer
// const targetElement = document.querySelector('.gallery');
// const options = {
//   rootMargin: '50px',
//   threshold: 0.01,
// };
// function handelObserver(entries, observer) {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       console.log(entry);
//     }
//   });
// }
// const watcher = new IntersectionObserver(handelObserver, options);
// watcher.observe(targetElement);
