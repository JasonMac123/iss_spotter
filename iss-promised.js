const request = require('request-promise-native');
const apiForIP = 'https://api.ipify.org?format=json';
const apiForCoords = 'http://ipwho.is/';
const apiForISS = 'https://iss-flyover.herokuapp.com/json/?';

const fetchMyIP = function() {
  return request(apiForIP);
};
const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`${apiForCoords}${ip}`);
};
const fetchISSFlyOverTimes = function(body) {
  const data = JSON.parse(body);
  const { latitude, longitude } = data;
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = {nextISSTimesForMyLocation};