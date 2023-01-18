const apiForIP = 'https://api.ipify.org?format=json';
const apiForCoords = 'http://ipwho.is/';
const apiForISS = 'https://iss-flyover.herokuapp.com/json/?';
const request = require('request');

const fetchMyIP = function(callback) {
  request(apiForIP, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    const data = JSON.parse(body);
    return callback(null, data.ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`${apiForCoords}${ip}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    const data = JSON.parse(body);
    if (!data.success) {
      const message = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`;
      return callback(Error(message), null);
    }
    const { latitude, longitude } = data;

    return callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`${apiForISS}lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const message = `Status code ${response.statusCode} when fetching for iss for coords: ${coords.latitude} & ${coords.longitude}`;
      return callback(Error(message), null);
    }
    const data = JSON.parse(body);
    return callback(null, data.response);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coords, (error, passes) => {
        if (error) {
          return callback(error, null);
        }
        return callback(null, passes);
      });
    });
  });
};

module.exports = {
  nextISSTimesForMyLocation
};