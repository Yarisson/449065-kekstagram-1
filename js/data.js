'use strict';

(function () {
  var randomNumber = function (min, max) {
    return min + Math.round((max - min) * Math.random());
  };

  window.data = {
    randomNumber: randomNumber
  };
})();
