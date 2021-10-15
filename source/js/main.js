// const getRandomInt = (min, max) => {
//   if (min >=0 && max >= 0) {
//     if (max - min > 0) {
//       return Math.floor(Math.random() * (max - min + 1) + min);
//     } else {
//       return'Подумай хорошенько'
//     }

//   } else {
//     return 'Укажите положительный диапазон'
//   }

// }

// console.log(getRandomInt(1, 10))

const getRandomInt = (min, max, num) => {
  if (min >=0 && max >= 0) {
    if (max - min > 0) {
      return Number((Math.random() * (max - min) + min).toFixed(num));
    } else {
      return'Подумай хорошенько'
    }
  } else {
    return 'Укажите положительный диапазон'
  }

}

console.log(getRandomInt(1, 10, 5));

