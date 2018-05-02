'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;
  var arrayPictures = [];
  var arrayNotSorted = [];

  var imgFilters = document.querySelector('.img-filters');
  var filterPopular = document.querySelector('#filter-popular');
  var filterNew = document.querySelector('#filter-new');
  var filterDiscussed = document.querySelector('#filter-discussed');
  var pictureLinks = document.querySelectorAll('.picture__link');

  window.debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };

  var sortArrayLikes = function (array) {
    array.sort(function (a, b) {
      if (a.likes > b.likes) {
        return -1;
      }
      if (a.likes < b.likes) {
        return 1;
      }
      // a должно быть равным b
      return 0;
    });
    paintingPictures(array);
    window.debounce(onFilterPopularClick);
  };

  var sortArrayComments = function (array) {
    array.sort(function (a, b) {
      if (a.comments.length > b.comments.length) {
        return -1;
      }
      if (a.comments.length < b.comments.length) {
        return 1;
      }
      // a должно быть равным b
      return 0;
    });
    paintingPictures(array);
    window.debounce(onFilterDiscussedClick);
  };

  var onFilterPopularClick = function () {
    var pictureLink = document.querySelectorAll('.picture__link');
    for (var i = 0; i < pictureLink.length; i++) {
      pictureLink[i].parentNode.removeChild(pictureLink[i]);
    }
    filterPopular.classList.add('img-filters__button--active');
    filterNew.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    sortArrayLikes(window.picture.arrayPictures);
    window.gallery.addEventListenerOnPictures();
  };

  var onFilterNewClick = function () {
    var pictureLink = document.querySelectorAll('.picture__link');
    for (var i = 0; i < pictureLink.length; i++) {
      pictureLink[i].parentNode.removeChild(pictureLink[i]);
    }
    filterNew.classList.add('img-filters__button--active');
    filterPopular.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    paintingPictures(window.picture.arrayNotSorted);
    window.gallery.addEventListenerOnPictures();
  };

  var onFilterDiscussedClick = function () {
    var pictureLink = document.querySelectorAll('.picture__link');
    for (var i = 0; i < pictureLink.length; i++) {
      pictureLink[i].parentNode.removeChild(pictureLink[i]);
    }
    filterDiscussed.classList.add('img-filters__button--active');
    filterNew.classList.remove('img-filters__button--active');
    filterPopular.classList.remove('img-filters__button--active');
    sortArrayComments(window.picture.arrayPictures);
    window.gallery.addEventListenerOnPictures();
  };

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
    window.debounce(onFilterNewClick);
  };

  var initPictures = function () {
    window.backend.load(function (pictures) {
      imgFilters.classList.remove('img-filters--inactive');
      pictures = pictures.pop();
      paintingPictures(pictures);
      window.picture.arrayNotSorted = pictures.slice(0);
      window.picture.arrayPictures = pictures;
      window.gallery.addEventListenerOnPictures();
    },
    function (errorMessage) {
      elementErrorShow(errorMessage);
    }
    );
  };

  initPictures();

  filterPopular.addEventListener('click', onFilterPopularClick);
  filterNew.addEventListener('click', onFilterNewClick);
  filterDiscussed.addEventListener('click', onFilterDiscussedClick);

  window.picture = {
    arrayPictures: arrayPictures,
    elementErrorShow: elementErrorShow,
    pictureLinks: pictureLinks,
    arrayNotSorted: arrayNotSorted
  };

})();
