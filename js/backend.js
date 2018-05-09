'use strict';

(function () {
  var STATUS_OK = 200;
  var STATUS_BAD_REQUEST = 400;
  var STATUS_UNAUTHORIZED = 401;
  var STATUS_NOT_FOUND = 404;

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {

      var error;
      switch (xhr.status) {
        case STATUS_OK:
          onLoad(xhr.response);
          break;

        case STATUS_BAD_REQUEST:
          error = 'Неверный запрос';
          break;
        case STATUS_UNAUTHORIZED:
          error = 'Пользователь не авторизован';
          break;
        case STATUS_NOT_FOUND:
          error = 'Ничего не найдено';
          break;

        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('GET', 'https://js.dump.academy/kekstagram/data');
    xhr.send(onLoad, onError);
  };

  var upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    var imgUploadMessageError = document.querySelector('.img-upload__message--error');
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case STATUS_OK:
          onLoad(xhr.response);
          break;
        case STATUS_BAD_REQUEST:
          error = 'Неверный запрос';
          break;
        case STATUS_UNAUTHORIZED:
          error = 'Пользователь не авторизован';
          break;
        case STATUS_NOT_FOUND:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        onError(error);
        imgUploadMessageError.classList.remove('.hidden');
      }

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000; // 10s

    });

    xhr.open('POST', 'https://js.dump.academy/kekstagram');
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
