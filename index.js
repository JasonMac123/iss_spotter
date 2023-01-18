const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  for (const date of passTimes) {
    console.log(`${date.risetime} with duration of ${date.duration} seconds`);
  }
});