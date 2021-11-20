import './load.js';
// import { loadData } from './load.js';
import { sortPoint } from './map-filter.js';

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const address = document.querySelector('#address');


adForm.classList.add('ad-form--disabled');
adForm.querySelectorAll('fieldset').forEach((item) => {
  item.setAttribute('disabled', '');
});

mapFilters.classList.add('map__filters--disabled');
mapFilters.querySelectorAll('select').forEach((item) => {
  item.setAttribute('disabled', '');
});

const mapCanvas = L.map('map-canvas')
  .on('load', () => {
    adForm.classList.remove('ad-form--disabled');
    adForm.querySelectorAll('fieldset').forEach((item) => {
      item.removeAttribute('disabled');
    });

    mapFilters.classList.remove('map__filters--disabled');
    mapFilters.querySelectorAll('select').forEach((item) => {
      item.removeAttribute('disabled');
    });
  })
  .setView({
    lat: 35.67674,
    lng: 139.74970,
  }, 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(mapCanvas);

const mainMarkerIcon = L.icon({
  iconUrl: '../leaflet/images/marker-icon-2x.png',
  iconSize: [50, 82],
  iconAnchor: [25, 82],
});

const mainMarker = L.marker(
  {
    lat: 35.67674,
    lng: 139.74971,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

const getAddressValue = () => {
  address.value = Object.values(Object.values(mainMarker)[1]).join(', ');
}

getAddressValue();

mainMarker.addTo(mapCanvas);

let mainMarkerAddress = () => {
  mainMarker.addEventListener('moveend', (evt) => {
    address.value = Object.values(evt.target.getLatLng()).map((item) => {
      let result = item.toFixed(5);
      return result;
    }).join(', ');
  });
}

mainMarkerAddress();

const typeHome = (home) => {
  if(home === 'palace') {
    return 'Дворец'
  } if(home === 'house') {
    return 'Дом'
  } if(home === 'bungalow') {
    return 'Бунгало'
  } if(home === 'flat') {
    return 'Квартира'
  }
};

// Загрузка данных с серевера с помощью метода fetch

const getPoints = (data) =>  {
  const points = data.map((elem) => {
    const point = {
      lat: elem.location.lat,
      lng: elem.location.lng,
      title: elem.offer.title,
      address: elem.offer.address,
      price: elem.offer.price,
      type: elem.offer.type,
      rooms: elem.offer.rooms,
      guests: elem.offer.guests,
      checkin: elem.offer.checkin,
      checkout: elem.offer.checkout,
      features: elem.offer.features,
      description: elem.offer.description,
      photos: elem.offer.photos,
      avatar: elem.author.avatar,
    }
    return point;
  });

  const createCustomPopup = (point) => {
    const baloonTemplate = document.querySelector('#card').content.querySelector('.popup');
    const popupElement = baloonTemplate.cloneNode(true);

    popupElement.querySelector('.popup__title').textContent = point.title;
    popupElement.querySelector('.popup__text--address').textContent = point.address;
    popupElement.querySelector('.popup__text--price').textContent = point.price + ' Р/ночь';
    popupElement.querySelector('.popup__type').textContent = typeHome(point.type);
    popupElement.querySelector('.popup__text--capacity').textContent = point.rooms + ' комн. для ' + point.guests + ' гостей';
    popupElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + point.checkin + ' выезд до ' + point.checkout;
    popupElement.querySelector('.popup__features').textContent = '';
    point.features.forEach((elem) => {
      const genFeatures =  popupElement.querySelector('.popup__features');
      if(elem == 'wifi') {
        genFeatures.insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--wifi"></li>');
      } if(elem == 'dishwasher') {
        genFeatures.insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--dishwasher"></li>');
      } if(elem == 'parking') {
        genFeatures.insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--parking"></li>');
      } if(elem == 'whaser') {
        genFeatures.insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--washer"></li>');
      } if(elem == 'elevator') {
        genFeatures.insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--elevator"></li>');
      } if(elem == 'conditioner') {
        genFeatures.insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--conditioner"></li>');
      } if(!elem) {
        genFeatures.style.display = 'none';
      }
    });
    popupElement.querySelector('.popup__description').textContent = point.description;
    popupElement.querySelector('.popup__photos').innerHTML = ''
    point.photos.forEach((elem) => {
      if(elem) {
        popupElement.querySelector('.popup__photos').insertAdjacentHTML('afterbegin', '<img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
        popupElement.querySelector('.popup__photo').setAttribute('src', elem);
      } else {
        popupElement.querySelector('.popup__photos').style.display = 'none';
      }
    });

    if(!point.avatar) {
      popupElement.querySelector('.popup__avatar').style.display = 'none';
    } else {
      popupElement.querySelector('.popup__avatar').setAttribute('src', point.avatar);
    }
    return popupElement;
  }

  points
    .slice()
    .sort(sortPoint)
    .slice(0, 5)
    .forEach( (point) => {
      const {lat, lng} = point;
      const markerIcon = L.icon({
        iconUrl: '../leaflet/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12.5, 41],
      });

      const marker = L.marker(
        {
          lat,
          lng,
        },
        {
          icon: markerIcon,
        },
      );

      marker.removeFrom(mapCanvas)


      marker
        .addTo(mapCanvas)
        .bindPopup(
          createCustomPopup(point),
          {
            keepInView: true,
          },
        )
    })
}

// Загрузка данных с сервера с использованием XHR

// Window.load((announcement) => {
//   const points = announcement.map((elem) => {
//     const point = {
//       lat: elem.location.lat,
//       lng: elem.location.lng,
//       title: elem.offer.title,
//       address: elem.offer.address,
//       price: elem.offer.price,
//       type: elem.offer.type,
//       rooms: elem.offer.rooms,
//       guests: elem.offer.guests,
//       checkin: elem.offer.checkin,
//       checkout: elem.offer.checkout,
//       features: elem.offer.features,
//       description: elem.offer.description,
//       photos: elem.offer.photos,
//       avatar: elem.author.avatar,
//     }
//     return point;
//   });

//   const createCustomPopup = (points) => {
//     const baloonTemplate = document.querySelector('#card').content.querySelector('.popup');
//     const popupElement = baloonTemplate.cloneNode(true);

//     popupElement.querySelector('.popup__title').textContent = points.title;
//     popupElement.querySelector('.popup__text--address').textContent = points.address;
//     popupElement.querySelector('.popup__text--price').textContent = points.price + ' Р/ночь';
//     popupElement.querySelector('.popup__type').textContent = typeHome(points.type);
//     popupElement.querySelector('.popup__text--capacity').textContent = points.rooms + ' комн. для ' + points.guests + ' гостей';
//     popupElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + points.checkin + ' выезд до ' + points.checkout;
//     popupElement.querySelector('.popup__features').textContent = '';
//     points.features.forEach((elem) => {
//       const genFeatures =  popupElement.querySelector('.popup__features');
//       if(elem == 'wifi') {
//         genFeatures.insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--wifi"></li>');
//       } if(elem == 'dishwasher') {
//         genFeatures.insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--dishwasher"></li>');
//       } if(elem == 'parking') {
//         genFeatures.insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--parking"></li>');
//       } if(elem == 'whaser') {
//         genFeatures.insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--washer"></li>');
//       } if(elem == 'elevator') {
//         genFeatures.insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--elevator"></li>');
//       } if(elem == 'conditioner') {
//         genFeatures.insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--conditioner"></li>');
//       } if(!elem) {
//         genFeatures.style.display = 'none';
//       }
//     });
//     popupElement.querySelector('.popup__description').textContent = points.description;
//     popupElement.querySelector('.popup__photos').innerHTML = ''
//     points.photos.forEach((elem) => {
//       if(elem) {
//         popupElement.querySelector('.popup__photos').insertAdjacentHTML('afterbegin', '<img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
//         popupElement.querySelector('.popup__photo').setAttribute('src', elem);
//       } else {
//         popupElement.querySelector('.popup__photos').style.display = 'none';
//       }
//     });

//     if(!points.avatar) {
//       popupElement.querySelector('.popup__avatar').style.display = 'none';
//     } else {
//       popupElement.querySelector('.popup__avatar').setAttribute('src', points.avatar);
//     }
//     return popupElement;
//   }

//   for (let i = 0; i < 10; i++) {
//     const point = points[i];
//     const {lat, lng} = point;
//     const markerIcon = L.icon({
//       iconUrl: '../leaflet/images/marker-icon.png',
//       iconSize: [25, 41],
//       iconAnchor: [12.5, 41],
//     });

//     const marker = L.marker(
//       {
//         lat,
//         lng,
//       },
//       {
//         icon: markerIcon,
//       },
//     );

//     marker
//       .addTo(mapCanvas)
//       .bindPopup(
//         createCustomPopup(point),
//         {
//           keepInView: true,
//         },
//       )
//   }
// });

export { mapCanvas, getAddressValue, mainMarker, adForm, getPoints };
