const modal = document.querySelector('.modal'),
  closeX = document.querySelector('.modal__header span'),
  closeBtn = document.querySelector('.modal__body button'),
  modalheader = document.querySelector('.modal__header');

const handelToggleModal = () => {
  if (sessionStorage.getItem('messageType')) {
    if (sessionStorage.getItem('messageType') === '성공 메시지') {
      document.querySelector(
        '.modal__title',
      ).innerText = sessionStorage.getItem('messageType');
      document.querySelector(
        '.moda__content',
      ).innerText = sessionStorage.getItem('messageContent');
      document.querySelector('.modal').classList.toggle('show');
      document.querySelector('.modal__header').classList.toggle('success');
      sessionStorage.removeItem('messageType');
      sessionStorage.removeItem('messageContent');
    } else {
      document.querySelector(
        '.modal__title',
      ).innerText = sessionStorage.getItem('messageType');
      document.querySelector(
        '.moda__content',
      ).innerText = sessionStorage.getItem('messageContent');
      document.querySelector('.modal').classList.toggle('show');
      document.querySelector('.modal__header').classList.toggle('warning');
      sessionStorage.removeItem('messageType');
      sessionStorage.removeItem('messageContent');
    }
  }
};

const handleModalWindow = (event) => {
  if (event.target === modal) handleModal();
};

const handleModal = () => {
  modal.classList.toggle('show');
  modalheader.className = 'modal__header';
};

const modaInit = () => {
  closeX.addEventListener('click', handleModal);
  closeBtn.addEventListener('click', handleModal);
  window.addEventListener('click', handleModalWindow);
  window.addEventListener('load', handelToggleModal);
};

modaInit();
