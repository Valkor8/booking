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

const type = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

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
  const randomAvatar = getRandomInt(0, avatar.length - 1);

  return  {
    avatar: avatar[randomAvatar],
  };
};

const getRandomArrayElement = (elemetns) => {
  return elemetns[getRandomInt(0, elemetns.length - 1)];
};

const getRandomArrayLength = (arr) => {
  return arr.slice(getRandomInt(0, arr.length - 1));
};

const offer = () => {
  return {
    title: title,
    adress: getRandomFloat(1, 180, 2) + ', ' + getRandomFloat(1, 180, 2),
    price: getRandomInt(10000, 100000),
    type: getRandomArrayElement(type),
    rooms: getRandomInt(1, 10),
    guests: getRandomInt(1, 15),
    checkin: getRandomArrayElement(checkin),
    checkout: getRandomArrayElement(checkout),
    features: getRandomArrayLength(features),
    description: description,
    photo: getRandomArrayLength(photo),
  };
};

const coordinates = () => {
  return {
    x: getRandomFloat(35.65000, 35.70000, 5),
    y: getRandomFloat(139.70000, 139.80000, 5),
  };
};

const obj = () => {
  return {
    author: author(),
    offer: offer(),
    location: coordinates(),
  };
}


// const getArray = () => {
//   let array = []
//   for (let i = 0; i <= 9; i++) {
//     array[i] = obj()
//   }
//   return array;
// }

//

const getArray = new Array(10).fill(null).map(() => obj());

console.log(getArray);

