import goodOlAjax from './good-ol-ajax-promise';

const api = 'https://sid-maps-api.firebaseapp.com';

function GetAllPlaces() {
  const promiseObj = new Promise((resolve, reject) => {
    const dbApi = `${api}/mapdata`;

    goodOlAjax(dbApi)
    .then((data) => {
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    });
  });

  return promiseObj;
}

function FindCitiesByCountryCode(countryCode) {
  const promiseObj = new Promise((resolve, reject) => {
    GetAllPlaces()
    .then((places) => {
      const arr = [];
      places.forEach((p) => {
        const thisPlace = p;

        if (thisPlace.city_id && thisPlace.country_code === countryCode) {
          arr.push(thisPlace);
        }
      });

      resolve(arr);
    })
    .catch((err) => {
      reject(err);
    });
  });

  return promiseObj;
}

function FindPlaceByCoordinates(lat, lng) {
  const promiseObj = new Promise((resolve, reject) => {
    GetAllPlaces()
    .then((places) => {
      let toSend = '';
      places.forEach((p) => {
        const thisPlace = p;
        const thisLatRound = Math.round(thisPlace.lat);
        const thisLngRound = Math.round(thisPlace.lng);
        const latRound = Math.round(lat);
        const lngRound = Math.round(lng);
        const latMax = latRound + 1;
        const lngMax = lngRound + 1;
        const latMin = latRound - 1;
        const lngMin = lngRound - 1;

        if (thisLatRound <= latMax && thisLatRound >= latMin
          && thisLngRound <= lngMax && thisLngRound >= lngMin) {
          toSend = thisPlace;
          return;
        }
      });

      resolve(toSend);
    })
    .catch((err) => {
      reject(err);
    });
  });

  return promiseObj;
}

export {
  GetAllPlaces,
  FindCitiesByCountryCode,
  FindPlaceByCoordinates,
};
