'use stirct';
const mapFilterContainer = document.querySelector('.map__filters-container');
const mapFilterForm = mapFilterContainer.querySelector('form');
const housingType = mapFilterContainer.querySelector('#housing-type');
const housingPrice = mapFilterContainer.querySelector('#housing-price');
const housingRooms = mapFilterContainer.querySelector('#housing-rooms');
const housingGuests = mapFilterContainer.querySelector('#housing-guests');
const housingFeatures = mapFilterContainer.querySelector('#housing-features');
const housingFeaturesInput = housingFeatures.querySelectorAll('input');

const renderFilter = (cb) => {
  mapFilterForm.addEventListener('change', () => {
    cb();
  });
}

const getPointsRank = (point) => {

  let rank = 0;

  if (point.offer.type === housingType.value) {
    rank += 1;
  }

  if (point.offer.price < 10000 && housingPrice.value === 'low') {
    rank += 1;
  }

  if (point.offer.price >= 10000 && 49999 >= point.offer.price && housingPrice.value === 'middle') {
    rank += 1;
  }

  if (point.offer.price >= 50000 && housingPrice.value === 'high') {
    rank += 1;
  }

  if (point.offer.rooms === parseInt(housingRooms.value)) {
    rank += 1;
  }

  if (point.offer.guests === parseInt(housingGuests.value)) {
    rank += 1;
  }

  let features = point.offer.features;
  for (let i = 0; i < features.length; i++) {
    housingFeaturesInput.forEach( (input) => {
      if(input.checked) {
        if (features[i] === input.value) {
          rank += 0.5;
        }
      }
    });
  }

  return rank;
}

const sortPoint = (pointA, pointB) => {
  const rankA = getPointsRank(pointA);
  const rankB = getPointsRank(pointB);

  return rankB - rankA;
}

export { getPointsRank, sortPoint, housingFeatures, renderFilter, mapFilterForm }

