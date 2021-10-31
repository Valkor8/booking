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
  testDiv.appendChild(bookingElement);
});

