'use stirct';
import { mapFilters } from './map.js';

const map = document.querySelector('.map');
const mapCanvas = document.querySelector('#map-canvas');
const mapFilter = document.querySelector('.map__filters-container');

const errorLoad = (message) => {
  const newDiv = document.createElement('div');
  newDiv.style.backgroundColor = '#cccccc';
  newDiv.style.width = '1200px';
  newDiv.style.height = '550px';
  newDiv.textContent = message;
  mapCanvas.style.display = 'none';
  mapFilter.style.display = 'none';
  map.appendChild(newDiv);
};

const loadData = (onSuccess) => {
  const URL_LOAD = 'https://22.javascript.pages.academy/keksobooking/data';

  fetch(URL_LOAD)
    .then( (responce) => {
      if (responce.ok){
        return responce.json();
      } else if (responce.status === 404) {
        errorLoad('Произошла ошибка загрузки объявлений.');
      } else if (responce.status === 500) {
        errorLoad('Истекло время ожидания сервера');
      } else {
        errorLoad('Произошла ошибка загрузки объявлений. Попробуйте обновить страницу или вернитесь позже!');
      }
    })
    .then( (data) => {
      onSuccess(data);
      mapFilters.classList.remove('map__filters--disabled');
      mapFilters.querySelectorAll('select').forEach((item) => {
        item.removeAttribute('disabled');
      });
      return data;
    });
};

// const loadData = () => {
//   const URL_LOAD = 'https://22.javascript.pages.academy/keksobooking/data';

//   Window.load = function (onSuccess) {
//     const xhr = new XMLHttpRequest();
//     xhr.responseType = 'json';

//     xhr.open('GET', URL_LOAD);

//     xhr.addEventListener('load', () => {
//       if(xhr.status === 200) {
//         onSuccess(xhr.response)
//       } else {
//         errorLoad('Произошла ошибка загрузки объявлений. Попробуйте обновить страницу или вернитесь позже!');
//       }
//     });

//     xhr.addEventListener('error', () => {
//       errorLoad('Произошла ошибка загрузки объявлений. Попробуйте обновить страницу или вернитесь позже!');
//     })

//     xhr.addEventListener('timeout', () => {
//       errorLoad('Истекло время ожидания сервера');
//     })

//     xhr.timeout = 10000;
//     xhr.send();
//   }
// }

// loadData();
export{loadData};
