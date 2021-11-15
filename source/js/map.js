import { getArray } from './object.js';
import './load.js';

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
  }, 13);

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

const points = getArray.map((elem) => {
  const result = {
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
    photo: elem.offer.photo,
    avatar: elem.author.avatar,
  }
  return result;
});


const typeHome = (home) => {
  if(home == 'palace') {
    return 'Дворец'
  } if(home == 'house') {
    return 'Дом'
  } if(home == 'bungalow') {
    return 'Бунгало'
  } if(home == 'flat') {
    return 'Квартира'
  }
};

const createCustomPopup = (elem) => {
  const baloonTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popupElement = baloonTemplate.cloneNode(true);

  popupElement.querySelector('.popup__title').textContent = elem.title;
  popupElement.querySelector('.popup__text--address').textContent = elem.address;
  popupElement.querySelector('.popup__text--price').textContent = elem.price + ' Р/ночь';
  popupElement.querySelector('.popup__type').textContent = typeHome(elem.type);
  popupElement.querySelector('.popup__text--capacity').textContent = elem.rooms + ' комнаты для ' + elem.guests + ' гостей';
  popupElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + elem.checkin + ' выезд до ' + elem.checkout;
  popupElement.querySelector('.popup__features').textContent = '';
  elem.features.forEach((elem) => {
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
  popupElement.querySelector('.popup__description').textContent = elem.description;
  popupElement.querySelector('.popup__photos').innerHTML = ''
  elem.photo.forEach((elem) => {
    if(elem) {
      popupElement.querySelector('.popup__photos').insertAdjacentHTML('afterbegin', '<img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
      popupElement.querySelector('.popup__photo').setAttribute('src', elem);
    } else {
      popupElement.querySelector('.popup__photos').style.display = 'none';
    }
  });

  if(!elem.avatar) {
    popupElement.querySelector('.popup__avatar').style.display = 'none';
  } else {
    popupElement.querySelector('.popup__avatar').setAttribute('src', elem.avatar);
  }

  return popupElement;
}

points.forEach((point) => {
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

  marker
    .addTo(mapCanvas)
    .bindPopup(
      createCustomPopup(point),
      {
        keepInView: true,
      },
    );
});


// Window.load( (announcement) => {
//   const fragment = document.createDocumentFragment();

//   for (let i = 0; i < 11; i++) {
//     fragment.appendChild(createCustomPopup(announcement[i]));
//   }
//   document.querySelector('.test-div').appendChild(fragment);
// });

export { mapCanvas, getAddressValue, mainMarker, adForm, createCustomPopup };
