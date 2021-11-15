'use stirct';
import { createCustomPopup } from './map.js';

const loadData =  () => {
  const URL_LOAD = 'https://22.javascript.pages.academy/keksobooking/data';

  Window.load = function (onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL_LOAD);

    xhr.addEventListener('load', () => {
      if(xhr.status === 200) {
        onSuccess(xhr.status)
      } else {
        onError('Произошла ошибка')
      }
    });

    xhr.send();
  }
};

console.log(loadData());

console.log(Window.load());


// export {loadData};
