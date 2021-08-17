import refs from './refs';

// const photoEl = document.querySelectorAll('.image');
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
  refs.buttonModal.addEventListener('click', onCloseModalClick);
  refs.overlayModal.addEventListener('click', onCloseModalClick);
}

function onCloseModalClick() {
  refs.modal.classList.remove('is-open');
  refs.modalImg.src = '';

  refs.modalImg.alt = '';
  refs.buttonModal.removeEventListener('click', onCloseModalClick);
  refs.overlayModal.removeEventListener('click', onCloseModalClick);
  // window.removeEventListener('keydown', onArrowKey);
  window.removeEventListener('keydown', onClickEsc);
}

function onClickEsc(e) {
  const ESC_KEY_CODE = 'Escape';
  if (e.code === ESC_KEY_CODE) {
    refs.modal.classList.remove('is-open');
  }
}

refs.gallery.addEventListener('click', onOpenModalClick);
refs.modal.addEventListener('click', onCloseModalClick);
