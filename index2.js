const {nextISSTimesForMyLocation} = require('./iss-promised');

nextISSTimesForMyLocation()
  .then((passtimes) => {
    for (const pass of passtimes) {
      console.log(`risetime: ${pass.risetime} and duration: ${pass.duration}`);
    }
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });