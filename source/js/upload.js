import { adForm } from './map.js';
import { getAddressValue } from './map.js';
import { mainMarker } from './map.js';
import { mapCanvas } from './map.js';

const upLoadData = function () {
  const URL = 'https://22.javascript.pages.academy/keksobooking методом';

  Window.upload = function (data, onSuccess) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', () => {
      onSuccess(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  }
};

upLoadData();

adForm.addEventListener('submit', function (evt) {
  Window.upload(new FormData(adForm), function (responce) {
    adForm.reset();
    mainMarker.setLatLng([35.67674, 139.74971]);
    getAddressValue();
  });

  evt.preventDefault();
})

// Необходимо заменить тестовые данные на реальные с сервера
