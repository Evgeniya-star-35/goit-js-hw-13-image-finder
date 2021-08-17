import refs from './refs';

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

const photoEl = document.querySelectorAll('.image');
console.log(photoEl.length);
export function onClickArrowIconLeft() {
  for (let i = 0; i < photoEl.length; i += 1) {
    if (photoEl[i].dataset.source === refs.modalImg.src) {
      if (i === 0) {
        return;
      }
      refs.modalImg.src = photoEl[i - 1].dataset.source;
      refs.modalImg.alt = photoEl[i - 1].alt;
      return;
    }
  }
}
export function onClickArrowIconRight() {
  for (let i = 0; i < photoEl.length; i += 1) {
    if (photoEl[i].dataset.source === refs.modalImg.src) {
      if (i === photoEl.length - 1) {
        return;
      }
      refs.modalImg.src = photoEl[i + 1].dataset.source;
      refs.modalImg.alt = photoEl[i + 1].alt;
      return;
    }
  }
}
export function onArrowKey(e) {
  for (let i = 0; i < photoEl.length; i += 1) {
    if (photoEl[i].dataset.source === refs.modalImg.src) {
      if (e.code === 'ArrowLeft') {
        if (i === 0) {
          return;
        }
        refs.modalImg.src = photoEl[i - 1].dataset.source;
        refs.modalImg.alt = photoEl[i - 1].alt;
        return;
      }
      if (e.code === 'ArrowRight') {
        if (i === photoEl.length - 1) {
          return;
        }
        refs.modalImg.src = photoEl[i + 1].dataset.source;
        refs.modalImg.alt = photoEl[i + 1].alt;
        return;
      }
    }
  }
}
refs.arrowRightModal.addEventListener('click', onClickArrowIconRight);
refs.arrowLeftModal.addEventListener('click', onClickArrowIconLeft);
window.addEventListener('keydown', onArrowKey);
refs.gallery.addEventListener('click', onOpenModalClick);
refs.modal.addEventListener('click', onCloseModalClick);
