// import {getRandomInt} from './random.js';
// import {getRandomFloat} from './random.js';
import { getArray } from './object.js';

const templateCard = document.querySelector('#card').content;
const testDiv = document.querySelector('.test-div');

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


getArray.forEach( (elementBooking) => {
  const bookingElement = templateCard.cloneNode(true);
  bookingElement.querySelector('.popup__title').textContent = elementBooking.offer.title;
  bookingElement.querySelector('.popup__text--address').textContent = elementBooking.offer.address;
  bookingElement.querySelector('.popup__text--price').textContent = elementBooking.offer.price + ' Р/ночь';
  bookingElement.querySelector('.popup__type').textContent = typeHome(elementBooking.offer.type);
  bookingElement.querySelector('.popup__text--capacity').textContent = elementBooking.offer.rooms + ' комнаты для ' + elementBooking.offer.guests + ' гостей';
  bookingElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + elementBooking.offer.checkin + ' выезд до ' + elementBooking.offer.checkout;

  bookingElement.querySelector('.popup__features').innerHTML = ''

  elementBooking.offer.features.forEach((index) => {
    const genFeatures =  bookingElement.querySelector('.popup__features');
    if(index == 'wifi') {
      genFeatures.insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--wifi"></li>');
    } if(index == 'dishwasher') {
      genFeatures.insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--dishwasher"></li>');
    } if(index == 'parking') {
      genFeatures.insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--parking"></li>');
    } if(index == 'whaser') {
      genFeatures.insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--washer"></li>');
    } if(index == 'elevator') {
      genFeatures.insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--elevator"></li>');
    } if(index == 'conditioner') {
      genFeatures.insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--conditioner"></li>');
    }
  })

  bookingElement.querySelector('.popup__description').textContent = elementBooking.offer.description;
  bookingElement.querySelector('.popup__photos').innerHTML = ''
  elementBooking.offer.photo.forEach((elem) => {
    bookingElement.querySelector('.popup__photos').insertAdjacentHTML('afterbegin', '<img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
    bookingElement.querySelector('.popup__photo').setAttribute('src', elem);
  });

  testDiv.appendChild(bookingElement);
});
