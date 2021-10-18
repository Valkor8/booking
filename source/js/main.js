const getRandomInt = (min, max) => {
  if (min >=0 && max >= 0) {
    if (max - min >= 0) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    } else {
      return'Подумай хорошенько'
    }

  } else {
    return 'Укажите положительный диапазон'
  }

}

// console.log(getRandomInt(1, 10))

const getRandomFloat = (min, max, num) => {
  if (min >=0 && max >= 0) {
    if (max - min >= 0) {
      return Number((Math.random() * (max - min) + min).toFixed(num));
    } else {
      return'Максимальное число диапазона должно быть больше минимального'
    }
  } else {
    return 'Укажите положительный диапазон'
  }

}

// console.log(getRandomFloat(1, 10, 5));

const avatar = [
  '/source/img/avatars/user01.png',
  '/source/img/avatars/user02.png',
  '/source/img/avatars/user03.png',
  '/source/img/avatars/user04.png',
  '/source/img/avatars/user05.png',
  '/source/img/avatars/user06.png',
  '/source/img/avatars/user07.png',
  '/source/img/avatars/user08.png',
];

const title = 'Заголовок';
const adress = getRandomFloat(1, 180, 2) + ', ' + getRandomFloat(1, 180, 2);
const price = getRandomInt(100, 1000);
const type = [
  'palace',
  'flat',
  'house',
  'bungalow',
];
const rooms = getRandomInt(1, 10);
const guests = getRandomInt(1, 15);
const checkin = [
  '12:00',
  '13:00',
  '14:00',
];
const checkout = [
  '12:00',
  '13:00',
  '14:00',
];

const features = [
  'wifi',
  'dishwasher',
  'parking',
  'whaser',
  'elevator',
  'conditioner',
];

const description = 'Хорошее, красивое и просторное помещение';
const photo = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg0,',
];

const author = () => {
  const randomAvatar = getRandomInt(0, avatar.length - 1)

  return  {
    avatar: avatar[randomAvatar],
  }
}

// const getRandomArrayLength = (arr) => {
//   // return arr.splice(getRandomInt(0, arr.length - 1), getRandomInt(0, arr.length - 1))
// }

const getRandomArrayLength = features.map((value, index, array) =>{
  return value
})

// console.log(getRandomArrayLength(features))
console.log(getRandomArrayLength)

const getRandomArrayElement = (elemetns) => {
  return elemetns[getRandomInt(0, elemetns.length - 1)];
};

const offer = (source, maxlength) => {

  return {
    title: title,
    adress: adress,
    price: price,
    type: getRandomArrayElement(type),
    rooms: rooms,
    guests: guests,
    checkin: getRandomArrayElement(checkin),
    checkout: getRandomArrayElement(checkout),
    features: features,
    description: description,
    photo: photo,
  }
}

// console.log(offer())

const obj = () => {

  return {
    author: author(),
    offer: '',
    location: '',
  }
}

// console.log(obj())
