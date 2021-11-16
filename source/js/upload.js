'use stirct';

import { adForm, getAddressValue, mainMarker } from './map.js';

const main = document.querySelector('main');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorDiv = errorTemplate.cloneNode(true);
const errorMessage = errorDiv.querySelector('.error__message');

const adFormReset = document.querySelector('.ad-form__reset');

const upLoadData = function () {
  const onError = (err) => {
    console.log(err);
  };

  const URL = 'https://22.javascript.pages.academy/keksobooking';

  document.upload = (data, onSuccess) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', () => {
      let err;
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;

        case 400:
          err = 'Неверный запрос';
          break;

        case 401:
          err = 'Пользователь не авторизован';
          break;

        case 404:
          err = 'Ничего не найдено';
          break;

        default:
          err = 'Статус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if(err) {
        onError(err);
        errorMessage.textContent = err;
        main.appendChild(errorDiv);
      }
    });

    xhr.addEventListener('error', () => {
      errorMessage.textContent = 'Произошла ошибка соединения';
      main.appendChild(errorDiv);
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', () => {
      errorMessage.textContent = 'Истекло время ожидания';
      main.appendChild(errorDiv);
    });

    xhr.timeout = 1000;

    xhr.open('POST', URL);
    xhr.send(data);
  }
};

upLoadData();

const getMessage = () => {
  const messageTemplate = document.querySelector('#success').content.querySelector('.success');
  const messageSuccess =  messageTemplate.cloneNode(true);
  main.appendChild(messageSuccess);

  const closeMessage = () => {
    const messageDiv = document.querySelector ('.success');
    if (messageDiv) {
      main.removeChild(messageSuccess);
    }
  }

  document.addEventListener('click', closeMessage);
  document.addEventListener('keydown', (evt) => {
    if(evt.key === ('Escape' || 'Esc')) {
      closeMessage();
    }
  });
}

adForm.addEventListener('submit', function (evt) {
  document.upload(new FormData(adForm), () => {
    adForm.reset();
    mainMarker.setLatLng([35.67674, 139.74971]);
    getAddressValue();
    getMessage();
  });

  evt.preventDefault();
});

adFormReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  adForm.reset();
  mainMarker.setLatLng([35.67674, 139.74971]);
  getAddressValue();
});


const errorDivClose = () => {
  const errorDivCloseMessage = document.querySelector('.error');
  if (errorDivCloseMessage) {
    main.removeChild(errorDiv);
  }
}

document.addEventListener('click', errorDivClose);
document.addEventListener('keydown', (evt) => {
  if(evt.key === ('Escape' || 'Esc')) {
    errorDivClose();
  }
});
