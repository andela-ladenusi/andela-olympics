var development = {
  firebase: {
    apiKey: "AIzaSyBzwDH_eg5zL_VhVVRllBY-r-YnbHoH2ZI",
    authDomain: "iot-hackathon-286cf.firebaseapp.com",
    databaseURL: "https://iot-hackathon-286cf.firebaseio.com",
    storageBucket: "iot-hackathon-286cf.appspot.com",
    serviceAccount: './credentials/iot-hackathon-51f3693bbce3.json'
  }
};

var config = {
  development: development,
  test: development,
  production: development,
  staging: development
};

module.exports = config;
