import NewsApiService from './js/apiService';
import refs from './js/refs';
// import { onOpenModalClick } from './js/modal';
import markupImgTPL from './templates/markup-card.hbs';
import LoadMoreBtn from './js/loadMoreBtn';
import { notice } from '@pnotify/core';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import 'material-icons/iconfont/material-icons.css';

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

function onGalleryElClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  const changeModalImage = `<img src=${e.target.dataset.source} alt="icon" />`;
  const instance = basicLightbox.create(changeModalImage);

  instance.show();
  window.addEventListener('keydown', e => {
    if (e.code === 'Escape') {
      instance.close();
    }
  });
}

const newsApiService = new NewsApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.gallery.addEventListener('click', onGalleryElClick);
refs.searchForm.addEventListener('submit', onSearchImages);
loadMoreBtn.refs.button.addEventListener('click', scrollPage);

function onSearchImages(e) {
  e.preventDefault();
  const form = e.currentTarget;
  newsApiService.query = form.elements.query.value;

  if (newsApiService.query === '') {
    loadMoreBtn.hide();
    error({
      text: 'Please enter something!',
      delay: 2000,
    });
  }
  clearImgGallery();
  fetchImg();
  loadMoreBtn.show();
  newsApiService.resetPage();

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

  newsApiService
    .fetchImages()
    .then(hits => {
      renderImgCard(hits);

      loadMoreBtn.enable();

      if (hits.length === 0) {
        loadMoreBtn.hide();
        noFound();
      }
      onNotice();
    })
    .catch(onError);
}
function noFound() {
  error({
    text: 'No matches found. Please enter another query!',
    delay: 2500,
  });
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

function scrollPage() {
  try {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }, 1000);
    fetchImg();
  } catch (error) {
    console.log(error);
  }
}
// scroll up
window.addEventListener('scroll', trackScroll);
refs.goTopBtn.addEventListener('click', backToTop);

function trackScroll() {
  var scrolled = window.pageYOffset;
  var coords = document.documentElement.clientHeight;

  if (scrolled > coords) {
    refs.goTopBtn.classList.add('back_to_top-show');
  }
  if (scrolled < coords) {
    refs.goTopBtn.classList.remove('back_to_top-show');
  }
}
function backToTop() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -80);
    setTimeout(backToTop, 0);
  }
}
