'use strict';

(function () {
  var randomNumber = function (theSmallestNumber, theLargestNumber) {
    return theSmallestNumber + Math.round((theLargestNumber - theSmallestNumber) * Math.random());
  };

  window.data = {
    randomNumber: randomNumber
  };
})();
