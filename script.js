"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

let map, mapEvent;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      //   const latitude = position.coords.latitude;
      //   const longitude = position.coords.longitude;
      // can also get the same thing using destructuring
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      // Google Mpaps Link: https://www.google.com/maps/@28.699732,77.0734418,11.62z
      // first comes the latitude and then comes the longitude in the link
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude];
      map = L.map("map").setView(coords, 13); // L is the entry point

      //console.log(map);

      L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      //handling clicks on maps
      map.on("click", function (mapE) {
        mapEvent = mapE;
        form.classList.remove("hidden");
        inputDistance.focus();
      });
    },
    function () {
      alert("Couldn't get your position!");
    }
  );
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Clear the input feilds
  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      "";
  // Display Marker
  console.log(mapEvent);
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng]) // for marker position
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 50,
        autoClose: false,
        closeOnClick: false,
        className: "running-popup",
      })
    )
    .setPopupContent("Walking and shitting")
    .openPopup();
});

inputType.addEventListener("change", function () {
  inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
  inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
});
