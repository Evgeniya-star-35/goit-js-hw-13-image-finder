import refs from './refs.js';

export function onOpenModalClick(e) {
  e.preventDefault();
  const target = e.target;
  if (target.nodeName !== 'IMG') {
    return;
  }

  refs.modal.classList.add('is-open');
  refs.modalImg.src = target.dataset.source;
  refs.modalImg.alt = target.alt;

  window.addEventListener('keydown', onClickEsc);
}

export function onCloseModalClick() {
  refs.modal.classList.remove('is-open');
  refs.modalImg.src = '#';
  refs.modalImg.alt = '#';
  window.removeEventListener('keydown', onClickEsc);
}

export function onClickEsc(e) {
  const ESC_KEY_CODE = 'Escape';
  if (e.code === ESC_KEY_CODE) {
    refs.modal.classList.remove('is-open');
  }
}
refs.gallery.addEventListener('click', onOpenModalClick);
refs.modal.addEventListener('click', onCloseModalClick);
