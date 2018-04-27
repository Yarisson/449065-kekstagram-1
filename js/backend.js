'use strict';

(function () {
  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open('GET', 'https://js.dump.academy/kekstagram/data');
    xhr.send(onLoad, onError);
  };

  window.upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
      onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
    });

    xhr.open('POST', 'https://js.dump.academy/kekstagram');
    xhr.send(data);
  };
})();
