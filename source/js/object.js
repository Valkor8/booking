// import {getRandomInt} from './random.js';
// import {getRandomFloat} from './random.js';
// // import {avatar, title, type, checkin, checkout, features, description, photo} from './util.js';

// const author = () => {
//   const randomAvatar = avatar.splice(getRandomInt(0, avatar.length - 1), 1).join('');

//   return {
//     avatar: randomAvatar,
//   }
// };

// const getRandomArrayElement = (elemetns) => {
//   return elemetns[getRandomInt(0, elemetns.length - 1)];
// };

// const getRandomArrayLength = (arr) => {
//   return arr.slice(getRandomInt(0, arr.length));
// };

// const offer = () => {
//   return {
//     title: title,
//     address: getRandomFloat(1, 180, 2) + ', ' + getRandomFloat(1, 180, 2),
//     price: getRandomInt(10, 100, 100),
//     type: getRandomArrayElement(type),
//     rooms: getRandomInt(1, 5),
//     guests: getRandomInt(1, 10),
//     checkin: getRandomArrayElement(checkin),
//     checkout: getRandomArrayElement(checkout),
//     features: getRandomArrayLength(features),
//     description: description,
//     photo: getRandomArrayLength(photo),
//   };
// };

// const getOffer = offer();

// const coordinates = () => {
//   return {
//     lat: getRandomFloat(35.65000, 35.70000, 5),
//     lng: getRandomFloat(139.70000, 139.80000, 5),
//   };
// };

// const coordinatesConst = coordinates();

// const obj = () => {
//   return {
//     author: author(),
//     offer: offer(),
//     location: coordinates(),
//   };
// }

// // const getArray = () => {
// //   let array = []
// //   for (let i = 0; i <= 9; i++) {
// //     array[i] = obj()
// //   }
// //   return array;
// // }

// //

// const getArray = new Array(10).fill(null).map(() => obj());

// // console.log(getArray);

// export {getArray, offer, getOffer, coordinates, coordinatesConst};

