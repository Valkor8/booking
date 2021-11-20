
const mapFilterContainer = document.querySelector('.map__filters-container');
const housingType = mapFilterContainer.querySelector('#housing-type');
const housingPrice = mapFilterContainer.querySelector('#housing-price');
const housingRooms = mapFilterContainer.querySelector('#housing-rooms');
const housingGuests = mapFilterContainer.querySelector('#housing-guests');
const housingFeatures = mapFilterContainer.querySelector('#housing-features');
const housingFeaturesInput = housingFeatures.querySelectorAll('input');

const renderFilter = (cb) => {
  housingFeaturesInput.forEach( () => {
    addEventListener('change', () => {
      cb();
    });
  })
}

const getPointsRank = (point) => {

  let rank = 0;

  if (point.type === housingType.value) {
    rank += 3;
  }

  if (point.price === housingPrice.value) {
    rank += 1;
  }

  if (point.rooms === housingRooms.value) {
    rank += 1;
  }

  if (point.guests === housingGuests.value) {
    rank += 1;
  }

  let features = point.features;
  for (let i = 0; i < features.length; i++) {
    housingFeaturesInput.forEach( (input) => {
      if(input.checked) {
        if (features[i] === input.value) {
          rank += 0.5;
        }
      }
    });
  }

  console.log(rank)
  return rank;
}

const sortPoint = (pointA, pointB) => {
  const rankA = getPointsRank(pointA);
  const rankB = getPointsRank(pointB);

  return rankB - rankA;
}

export { getPointsRank, sortPoint, housingFeatures, renderFilter }

