import { offer } from './object.js';
import { coordinates } from './object.js';
import { getArray } from './object.js';
import { coordinatesConst } from './object.js';

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const address = document.querySelector('#address');

adForm.classList.add('ad-form--disabled');
adForm.querySelectorAll('fieldset').forEach((item) => {
  item.setAttribute('disabled', '');
});

mapFilters.classList.add('map__filters--disabled');
mapFilters.querySelectorAll('select').forEach((item) => {
  item.setAttribute('disabled', '');
});

const mapCanvas = L.map('map-canvas')
  .on('load', () => {
    adForm.classList.remove('ad-form--disabled');
    adForm.querySelectorAll('fieldset').forEach((item) => {
      item.removeAttribute('disabled');
    });

    mapFilters.classList.remove('map__filters--disabled');
    mapFilters.querySelectorAll('select').forEach((item) => {
      item.removeAttribute('disabled');
    });
  })
  .setView({
    lat: 35.67674,
    lng: 139.74970,
  }, 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(mapCanvas);

const mainMarkerIcon = L.icon({
  iconUrl: '../leaflet/images/marker-icon-2x.png',
  iconSize: [50, 82],
  iconAnchor: [25, 82],
});

const mainMarker = L.marker(
  {
    lat: 35.67674,
    lng: 139.74970,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

address.value = Object.values(Object.values(mainMarker)[1]).join(', ');

mainMarker.addTo(mapCanvas);

let mainMarkerAddress = mainMarker.on('moveend', (evt) => {
  address.value = Object.values(evt.target.getLatLng()).map((item) => {
    let result = item.toFixed(5);
    return result;
  }).join(', ');
});

// const offerCoordinates = () => {
//   return [offer(), coordinates(), ]
// }

const getArrayAnnouncement = getArray.map((elem) => {
  const result = {
    lat: elem.location.lat,
    lng: elem.location.lng,
    title: elem.offer.title,
    address: elem.offer.address,
    price: elem.offer.price,
    type: elem.offer.type,
    rooms: elem.offer.rooms,
    guests: elem.offer.guests,
    checkin: elem.offer.checkin,
    checkout: elem.offer.checkout,
    features: elem.offer.features,
    description: elem.offer.description,
    photo: elem.offer.photo,
  }
  return result;
});

console.log(getArrayAnnouncement);

// const getAnnouncement = () => {
//   let arrayAdvt = [];
//   for(let i = 0; i < 10; i++) {
//     arrayAdvt[i] = coordinates();
//   }
//   return arrayAdvt;
// }

// const announcement = getAnnouncement();


getArrayAnnouncement.forEach(({lat, lng, title, address, price, type, rooms, guests, checkin, checkout, features, description, photo}) => {
  const markerIcon = L.icon({
    iconUrl: '../leaflet/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
  });

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: markerIcon,
    },
  );

  marker
    .addTo(mapCanvas)
    .bindPopup([title, address, price, type, rooms, guests, checkin, checkout, features, description, photo])

});
