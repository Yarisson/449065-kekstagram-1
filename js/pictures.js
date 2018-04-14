'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var randomNumber = function (a, b) {
  return a + Math.round((b - a) * Math.random());
};

var getArrayPictures = function () {
  var tempPictures = [];
  for (var i = 1; i < 26; i++) {
    var objectPhoto = {};
    objectPhoto.url = 'photos/' + i + '.jpg';
    objectPhoto.likes = randomNumber(15, 200);
    objectPhoto.description = DESCRIPTIONS[randomNumber(0, 5)];
    var indexComments = randomNumber(1, 2);
    for (var j = 0; j < indexComments; j++) {
      objectPhoto.comments = COMMENTS[randomNumber(0, 5)];
    }
    tempPictures[i - 1] = objectPhoto;
  }
  return tempPictures;
};

var renderPicture = function (picture, index) {
  var pictureTemplate = document.querySelector('#picture').content;
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').setAttribute('src', picture.url);
  pictureElement.querySelector('.picture__img').setAttribute('data-element-id', index);
  pictureElement.querySelector('.picture__stat--comments').textContent = picture.comments;
  pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
  return pictureElement;
};

var paintingPictures = function (array) {
  var picturesDraw = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length - 1; i++) {
    fragment.appendChild(renderPicture(array[i], i));
  }
  picturesDraw.appendChild(fragment);
};

var showBigPicture = function () {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');
};

var downloadToBigPicture = function (array, index) {
  document.querySelector('.big-picture__img').setAttribute('src', array[index].url);
  document.querySelector('.likes-count').textContent = array[index].likes;
  document.querySelector('.comments-count').textContent = array[index].comments.length;
};

var showSocialComments = function () {
  var socialCommentCount = document.querySelector('.social__comment-count');
  var socialCommentLoadmore = document.querySelector('.social__comment-loadmore');
  socialCommentCount.classList.add('visually-hidden');
  socialCommentLoadmore.classList.add('visually-hidden');
};

var addComment = function (index) {
  var element = document.createElement('li');

  element.classList.add('social__comment');
  element.classList.add('social__comment--text');
  element.textContent = pictureStatComments[index].textContent;

  var avatar = document.createElement('img');
  avatar.className = 'social__picture';
  avatar.src = 'img/avatar-' + randomNumber(1, 6) + '.svg';
  avatar.alt = 'Аватар комментатора фотографии';
  avatar.width = 35;
  avatar.height = 35;
  element.insertBefore(avatar, element.firstChild);

  return element;
};

var drawNewComments = function (index) {
  var socialCommentsDraw = document.querySelector('.social__comments');
  socialCommentsDraw.appendChild(addComment(index));
};

var initPictures = function () {
  var pictures = getArrayPictures();
  paintingPictures(pictures);
/*  showBigPicture();
  downloadToBigPicture(pictures);
  showSocialComments();
  drawNewComments(); */

//  var indexPictures = pictures.length;

//  for (var i = 0; i < indexPictures; i++) {
//    var pictureLink = document.querySelectorAll('.picture__link');
//    pictureLink.addEventListener('click', pictureClickHandler);
//  }

};

initPictures();

// 4 Задание

var pictureLink = document.querySelectorAll('.picture__link');
var pictureStatLikes = document.querySelectorAll('.picture__stat--likes');
var pictureStatComments = document.querySelectorAll('.picture__stat--comments');
var uploadFile = document.querySelector('#upload-file');
var imgUploadEffects = document.querySelector('.scale__pin');
var resizeControlValue = document.querySelector('.resize__control--value');
var resizeControlMinus = document.querySelector('.resize__control--minus');
var resizeControlPlus = document.querySelector('.resize__control--plus');
var imgUploadPreview = document.querySelector('.img-upload__preview');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');

var bigPictureCancelClickHandler = function () {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

var bigPictureCancelClickEsc = function (evt) {
  if (evt.keyCode === 27) {
    var bigPicture = document.querySelector('.big-picture');
    bigPicture.classList.add('hidden');
    document.body.classList.add('modal-open');
  }
};

var pictureClickHandler = function (evt) {
  evt.preventDefault();
  document.body.classList.add('modal-open');
  var currentId = evt.target.getAttribute('data-element-id');
  var imgSrc = evt.target.getAttribute('src');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  showBigPicture();
  document.querySelector('.big-picture__img').setAttribute('src', imgSrc);
  document.querySelector('.likes-count').textContent = pictureStatLikes[currentId].textContent;
  //  drawNewComments(currentId);

  document.querySelector('.social__comment--text').textContent = pictureStatComments[currentId].textContent;

  bigPictureCancel.addEventListener('click', bigPictureCancelClickHandler);
  document.addEventListener('keydown', bigPictureCancelClickEsc);
};

var clickPictures = function (array) {
  for (var i = 0; i < array.length; i++) {
    array[i].addEventListener('click', pictureClickHandler);
  }
};

var uploadCancelClickHandler = function () {
  imgUploadOverlay.classList.add('hidden');
};

var UploadCancelClickEsc = function (evt) {
  if (evt.keyCode === 27) {
    imgUploadOverlay.classList.add('hidden');
  }
};

var uploadFileClickHandler = function () {
  var imgUploadCancel = document.querySelector('.img-upload__cancel');
  imgUploadOverlay.classList.remove('hidden');
  imgUploadCancel.addEventListener('click', uploadCancelClickHandler);

  document.addEventListener('keydown', UploadCancelClickEsc);
};

resizeControlValue.setAttribute('value', '100%');

var uploadLevelPin = function (evt) {
  var imgEffect = imgUploadPreview.img;
  var value = evt.target.parentElement.getAttribute('for').substring(7);
  // imgEffect.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--phobos', 'effects__preview--marvin', 'effect-sepia', 'effects__preview--none');

  if (value === 'chrome') {
    imgEffect.classList.add('effect-chrome');
    imgUploadPreview.setAttribute('style', 'filter: grayscale(1)');
  } else if (value === 'sepia') {
    imgEffect.classList.add('effects__preview--sepia');
    imgUploadPreview.setAttribute('style', 'filter: sepia(1)');
  } else if (value === 'marvin') {
    imgEffect.classList.add('effects__preview--marvin');
    imgUploadPreview.setAttribute('style', 'filter: invert(100%)');
  } else if (value === 'phobos') {
    imgEffect.classList.add('effects__preview--phobos');
    imgUploadPreview.setAttribute('style', 'filter: blur(3, px)');
  } else if (value === 'heat') {
    imgEffect.classList.add('effects__preview--heat');
    imgUploadPreview.setAttribute('style', 'filter: brightness(3)');
  } else {
    imgEffect.classList.add('effects__preview--none');
    imgUploadPreview.setAttribute('style', 'filter: none');
  }
};

var resizePlus = function () {
  var sizeValue = parseInt(resizeControlValue.value, 10);
  if (sizeValue < 100) {
    sizeValue = (sizeValue + 25);
    resizeControlValue.setAttribute('value', sizeValue + '%');
    imgUploadPreview.style.transform = 'scale(' + sizeValue / 100 + ')';
  }
};

var resizeMinus = function () {
  var sizeValue = parseInt(resizeControlValue.value, 10);
  if (sizeValue > 25) {
    sizeValue = (sizeValue - 25);
    resizeControlValue.setAttribute('value', sizeValue + '%');
    imgUploadPreview.style.transform = 'scale(' + sizeValue / 100 + ')';
  }
};

clickPictures(pictureLink);

uploadFile.addEventListener('change', uploadFileClickHandler);
imgUploadEffects.addEventListener('mouseup', uploadLevelPin);
resizeControlPlus.addEventListener('click', resizePlus);
resizeControlMinus.addEventListener('click', resizeMinus);
