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

const cardFragment = document.createDocumentFragment();

getArray.forEach( (elementBooking) => {
  const bookingElement = templateCard.cloneNode(true);
  bookingElement.querySelector('.popup__title').textContent = elementBooking.offer.title;
  bookingElement.querySelector('.popup__text--address').textContent = elementBooking.offer.address;
  bookingElement.querySelector('.popup__text--price').textContent = elementBooking.offer.price + ' Р/ночь';
  bookingElement.querySelector('.popup__type').textContent = typeHome(elementBooking.offer.type);
  bookingElement.querySelector('.popup__text--capacity').textContent = elementBooking.offer.rooms + ' комнаты для ' + elementBooking.offer.guests + ' гостей';
  bookingElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + elementBooking.offer.checkin + ' выезд до ' + elementBooking.offer.checkout;

  bookingElement.querySelector('.popup__features').innerHTML = '';

  elementBooking.offer.features.forEach((elem) => {
    const genFeatures =  bookingElement.querySelector('.popup__features');
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
    }
  });

  bookingElement.querySelector('.popup__description').textContent = elementBooking.offer.description;
  bookingElement.querySelector('.popup__photos').innerHTML = ''
  elementBooking.offer.photo.forEach((elem) => {
    bookingElement.querySelector('.popup__photos').insertAdjacentHTML('afterbegin', '<img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
    bookingElement.querySelector('.popup__photo').setAttribute('src', elem);
  });

  if(!elementBooking.author.avatar) {
    bookingElement.querySelector('.popup__avatar').style.display = 'none';
  } else {
    bookingElement.querySelector('.popup__avatar').setAttribute('src', elementBooking.author.avatar);
  }

  bookingElement.querySelector('.popup').style.border = '2px solid red';
  bookingElement.querySelector('.popup').style.margin = '0 10px 10px 0';
  bookingElement.querySelector('.popup').style.padding = '2px';
  bookingElement.querySelector('.popup').style.width = '250px';
  testDiv.style.display = 'flex';
  testDiv.style.flexWrap = 'wrap';


  cardFragment.appendChild(bookingElement);
});

testDiv.appendChild(cardFragment);
