'use strict';

(function () {
  var ESC = 27;
  // var pictureStatLikes = document.querySelectorAll('.picture__stat--likes');
  var socialComments = document.querySelector('.social__comments');

  var showBigPicture = function (url, indexId, array) {
    var pictureStatLikes = document.querySelectorAll('.picture__stat--likes');
    var pictureStatComments = document.querySelectorAll('.picture__stat--comments');
    var bigPicture = document.querySelector('.big-picture');
    bigPicture.classList.remove('hidden');
    document.querySelector('.big-picture__img').querySelector('img').setAttribute('src', url);
    document.querySelector('.likes-count').textContent = pictureStatLikes[indexId].textContent;
    document.querySelector('.comments-count').textContent = pictureStatComments[indexId].textContent;
    var commentElements = [];
    for (var j = 0; j < array[indexId].comments.length; j++) {
      commentElements[j] = addComment(indexId, array, j);
      drawNewComments(commentElements[j]);
    }
  };

  var drawNewComments = function (commentsToDraw) {
    var socialCommentsDraw = document.querySelector('.social__comments');
    socialCommentsDraw.appendChild(commentsToDraw);
  };

  var addComment = function (index, array, commentIndex) {
    var element = document.createElement('li');

    element.classList.add('social__comment');
    element.classList.add('social__comment--text');
    element.textContent = array[index].comment[commentIndex];

    var avatar = document.createElement('img');

    avatar.className = 'social__picture';
    avatar.src = 'img/avatar-' + window.data.randomNumber(1, 6) + '.svg';
    avatar.alt = 'Аватар комментатора фотографии';
    avatar.width = 35;
    avatar.height = 35;

    element.insertBefore(avatar, element.firstChild);

    return element;
  };

  var showSocialComments = function () {
    var socialCommentCount = document.querySelector('.social__comment-count');
    var socialCommentLoadmore = document.querySelector('.social__comment-loadmore');
    socialCommentCount.classList.add('visually-hidden');
    socialCommentLoadmore.classList.add('visually-hidden');
  };

  var clearComments = function () {
    var socialComment = document.querySelectorAll('.social__comment');
    for (var i = 0; i < socialComment.length; i++) {
      socialComment[i].textContent = '';
    }
    while (socialComments.firstChild) {
      socialComments.removeChild(socialComments.firstChild);
    }
  };

  var bigPictureCancelClickHandler = function () {
    var bigPicture = document.querySelector('.big-picture');
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    clearComments();
  };

  var bigPictureCancelClickEsc = function (evt) {
    if (evt.keyCode === ESC) {
      var bigPicture = document.querySelector('.big-picture');
      bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
      clearComments();
    }
  };

  var pictureClickHandler = function (evt) {
    evt.preventDefault();
    document.body.classList.add('modal-open');
    var currentId = evt.target.getAttribute('data-element-id');
    var imgSrc = evt.target.getAttribute('src');
    var bigPictureCancel = document.querySelector('.big-picture__cancel');
    showBigPicture(imgSrc, currentId, window.picture.arrayPictures);
    showSocialComments();
    document.querySelector('.social__comment-count').classList.add('hidden');
    document.querySelector('.social__comment-loadmore').classList.add('hidden');
    bigPictureCancel.addEventListener('click', bigPictureCancelClickHandler);
    document.addEventListener('keydown', bigPictureCancelClickEsc);
  };

  var addEventListenerOnPictures = function () {
    var array = document.querySelectorAll('.picture__link');
    for (var i = 0; i < array.length; i++) {
      array[i].addEventListener('click', pictureClickHandler);
    }
  };

  window.gallery = {
    addEventListenerOnPictures: addEventListenerOnPictures,
  };
})();
