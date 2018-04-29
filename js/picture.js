'use strict';

(function () {
  var arrayPictures = [];

  var renderPicture = function (picture, index) {
    var pictureTemplate = document.querySelector('#picture').content;
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').setAttribute('src', picture.url);
    pictureElement.querySelector('.picture__img').setAttribute('data-element-id', index);
    pictureElement.querySelector('.picture__stat--comments').textContent = window.data.COMMENTS[0];
    pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
    return pictureElement;
  };

  /*  var paintingPictures = function (array) {
    var picturesDraw = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length - 1; i++) {
      fragment.appendChild(renderPicture(array[i], i));
    }
    picturesDraw.appendChild(fragment);
  }; */

  window.backend.load(function (pictures) {
    var picturesDraw = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(renderPicture(pictures[i]));
    }
    picturesDraw.appendChild(fragment);
    arrayPictures = pictures;
  });

  /*  var initPictures = function () {
    var pictures = window.backend.load();
    paintingPictures(pictures);
    arrayPictures = pictures;
  };

  initPictures(); */

  window.picture = {
    arrayPictures: arrayPictures
  };

})();
