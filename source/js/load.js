'use stirct';

const loadData = () => {
  const URL_LOAD = 'https://22.javascript.pages.academy/keksobooking/data';

  Window.load = function (onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL_LOAD);

    xhr.addEventListener('load', () => {
      if(xhr.status === 200) {
        onSuccess(xhr.response)
      } else {
        onError('Произошла ошибка')
      }
    });

    xhr.send();
  }
}

loadData();

// Написать код для обработки ошибок загрузки данных
