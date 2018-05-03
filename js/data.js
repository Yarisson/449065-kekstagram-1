'use strict';

(function () {
  var randomNumber = function (a, b) {
    return a + Math.round((b - a) * Math.random());
  };

  window.data = {
    randomNumber: randomNumber
  };
})();
