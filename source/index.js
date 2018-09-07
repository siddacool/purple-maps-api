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

function GetAllCountries() {
  const promiseObj = new Promise((resolve, reject) => {
    GetAllPlaces()
    .then((places) => {
      const arr = [];
      places.forEach((p) => {
        const thisPlace = p;

        if (thisPlace.country_id) {
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

function GetAllCities() {
  const promiseObj = new Promise((resolve, reject) => {
    GetAllPlaces()
    .then((places) => {
      const arr = [];
      places.forEach((p) => {
        const thisPlace = p;

        if (thisPlace.city_id) {
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

function FindCountryByCountryCode(countryCode) {
  const promiseObj = new Promise((resolve, reject) => {
    GetAllPlaces()
    .then((places) => {
      let obj = {};
      places.forEach((p) => {
        const thisPlace = p;

        if (thisPlace.country_id && thisPlace.country_code === countryCode) {
          obj = thisPlace;
          return;
        }
      });

      resolve(obj);
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
      const arr = [];
      const totalDiff = lat - lng;

      places.forEach((p) => {
        const thisPlace = p;
        const thisLat = thisPlace.lat;
        const thisLng = thisPlace.lng;
        const total = thisLat - thisLng;
        const latMin = +thisLat - 0.8;
        const latMax = +thisLat + 0.8;
        const lngMin = +thisLng - 0.8;
        const lngMax = +thisLng + 0.8;

        thisPlace.total = total;

        if (lat <= latMax && lat >= latMin && lng <= lngMax && lng >= lngMin) {
          arr.push(thisPlace);
        }
      });

      if (arr.length && arr.length > 0) {
        let diff = '';

        for (let i = 0; i < arr.length; i++) {
          const thisPlace = arr[i];
          const total = thisPlace.total;
          const thisDiff = totalDiff - total;

          if (diff === '' || diff > thisDiff) {
            diff = thisDiff;
            toSend = thisPlace;
          }
        }
      }

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
  GetAllCountries,
  GetAllCities,
  FindCitiesByCountryCode,
  FindCountryByCountryCode,
  FindPlaceByCoordinates,
};
