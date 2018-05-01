'use strict';

(function () {
  var arrayPictures = [];

  var renderPicture = function (picture, index) {
    var pictureTemplate = document.querySelector('#picture').content;
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').setAttribute('src', picture.url);
    pictureElement.querySelector('.picture__img').setAttribute('data-element-id', index);
    pictureElement.querySelector('.picture__stat--comments').textContent = picture.comments.length;
    pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
    return pictureElement;
  };

  var elementErrorShow = function (Message) {
    var elementError = document.createElement('div');
    elementError.classList.add('server__error');

    var elementErrorText = document.createElement('h2');

    elementErrorText.className = 'server__error__message';
    elementErrorText.textContent = Message;

    elementError.insertBefore(elementErrorText, elementError.firstChild);

    return elementError;
  };

  var paintingPictures = function (array) {
    var picturesDraw = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length - 1; i++) {
      fragment.appendChild(renderPicture(array[i], i));
    }
    picturesDraw.appendChild(fragment);
  };

  var initPictures = function () {
    window.backend.load(function (pictures) {
      paintingPictures(pictures);
      window.picture.arrayPictures = pictures;
      window.gallery.addEventListenerOnPictures();
    },
    function (errorMessage) {
      elementErrorShow(errorMessage);
    }
    );
  };

  initPictures();

  window.picture = {
    arrayPictures: arrayPictures,
    elementErrorShow: elementErrorShow
  };

})();
