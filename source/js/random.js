'use stirct';
const getRandomInt = (min, max, rounding) => {
  if(!rounding) {
    rounding = 1;
  }
  if (min >=0 && max >= 0) {
    if (max - min >= 0) {
      return ((Math.floor(Math.random() * (max - min + 1) + min)) * rounding);
    } else {
      return'Подумай хорошенько'
    }

  } else {
    return 'Укажите положительный диапазон'
  }
};

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
};

export {getRandomInt, getRandomFloat};
