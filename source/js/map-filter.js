import { loadData } from './load.js';

const mapFilterContainer = document.querySelector('.map__filters-container');
const housingType = mapFilterContainer.querySelector('#housing-type');
const housingPrice = mapFilterContainer.querySelector('#housing-price');
const housingRooms = mapFilterContainer.querySelector('#housing-rooms');
const housingGuests = mapFilterContainer.querySelector('#housing-guests');
const housingFeatures = mapFilterContainer.querySelector('#housing-features');
const housingFeaturesInput = housingFeatures.querySelectorAll('input');

// const filterHousing = (point) => {
//   housingType.addEventListener('change', () => {
//     if (housingType.value === 'palace') {
//       alert('Дворец')
//     }
//   })
// }

// filterHousing()

console.log(housingFeaturesInput)

housingFeatures.addEventListener('change', () => {

  loadData( (points) => {
    points.forEach( (elem) => {
      // console.log(elem.offer.features)
      let features = elem.offer.features
      for (let i = 0; i < features.length; i++) {
        // console.log(features[i])
        housingFeaturesInput.forEach( (input) => {
          if(input.checked) {
            if (features[i] === input.value) {
              rank += 0.5
            }
          }
        });
      }
    })
  })
});


const getPointsRank = (point) => {

  let rank = 0;

  if (point.offer.type === housingType.value) {
    rank += 3;
  }

  if (point.offer.price === housingPrice.value) {
    rank += 1;
  }

  if (point.offer.rooms === housingRooms.value) {
    rank += 1;
  }

  if (point.offer.guests === housingGuests.value) {
    rank += 1;
  }

  return rank;

  // loadData( (points) => {
  //   points.forEach( (elem) => {
  //     let features = elem.offer.features
  //     for (let i = 0; i < features.length; i++) {
  //       housingFeaturesInput.forEach( (input) => {
  //         if(input.checked) {
  //           if (features[i] === input.value) {
  //             rank += 0.5
  //           }
  //         }
  //       });
  //     }
  //   });
  // });
}

const cortPoint = (pointA, pointB) => {
  const rankA = getPointsRank(pointA);
  const rankB = getPointsRank(pointB);

  return rankB - rankA;
}
