'use strict';

var MAX_IMAGE_SIZE = 100;
var STEP_SIZE = 25;
var ESC_KEY = 27;
var HIDDEN_CLASS = 'hidden';

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

var uploadFile = document.querySelector('#upload-file');
var pictureCancel = document.querySelector('#picture-cancel');
var resizeControlPlus = document.querySelector('.resize__control--plus');
var resizeControlMinus = document.querySelector('.resize__control--minus');
var imgUploadEffects = document.querySelector('.img-upload__effects');
var resizeControlValue = document.querySelector('.resize__control--value');
var pictureElements = document.querySelectorAll('.picture__link');
var bigPictureCancel = document.querySelector('.big-picture__cancel');
var bigPicture = document.querySelector('.big-picture');
var bigPictureImg = document.querySelector('.big-picture__img');
var commentsCount = document.querySelector('.comments-count');
var likesCount = document.querySelector('.likes-count');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');

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

/*  var showBigPicture = function () {
  bigPicture.classList.remove('hidden');
}; */

var downloadToBigPicture = function (array, index) {
  bigPictureImg.setAttribute('src', array[index].url);
  likesCount.textContent = array[index].likes;
  commentsCount.textContent = array[index].comments.length;
};

var showSocialComments = function () {
  var socialCommentCount = document.querySelector('.social__comment-count');
  var socialCommentLoadmore = document.querySelector('.social__comment-loadmore');
  socialCommentCount.classList.add('visually-hidden');
  socialCommentLoadmore.classList.add('visually-hidden');
};

var addComment = function () {
  var element = document.createElement('li');

  element.classList.add('social__comment');
  element.classList.add('social__comment--text');
  element.textContent = COMMENTS[randomNumber(0, 5)];

  var avatar = document.createElement('img');
  avatar.className = 'social__picture';
  avatar.src = 'img/avatar-' + randomNumber(1, 6) + '.svg';
  avatar.alt = 'Аватар комментатора фотографии';
  avatar.width = 35;
  avatar.height = 35;
  element.insertBefore(avatar, element.firstChild);

  return element;
};

var drawNewComments = function () {
  var socialCommentsDraw = document.querySelector('.social__comments');
  for (var i = 0; i < 2; i++) {
    socialCommentsDraw.appendChild(addComment());
  }
};

var onUploadDialogPress = function (evt) {
  if (evt.keyCode === ESC_KEY) {
    imgUploadOverlay.classList.add(HIDDEN_CLASS);
  }
};

var uploadFileClose = function () {
  document.removeEventListener('keydown', onUploadDialogPress);
  imgUploadOverlay.classList.add(HIDDEN_CLASS);
};

var uploadFileOpen = function () {
  imgUploadOverlay.classList.remove(HIDDEN_CLASS);
  document.addEventListener('keydown', onUploadDialogPress);
};

var bigPictureClickCancel = function () {
  var body = document.querySelector('body');
  body.classList.remove('modal-open');
  bigPicture.classList.add(HIDDEN_CLASS);
};

var galleryEsc = function (evt) {
  if (evt.keyCode === ESC_KEY) {
    bigPicture.classList.add(HIDDEN_CLASS);
  }
};

var resizeControlsValue = document.querySelector('.resize__control--value');
var imgUploadPreview = document.querySelector('.img-upload__preview');
var effectImagePreview = document.querySelector('.effect-image-preview');
var scaleValue = document.querySelector('.scale__value');
imgUploadPreview.querySelector('img').classList.add('effect-image-preview');

var resizeIncrease = function () {
  var sizeValue = parseInt(resizeControlsValue.value, 10);
  if (sizeValue < MAX_IMAGE_SIZE) {
    sizeValue = (sizeValue + STEP_SIZE);
    resizeControlsValue.setAttribute('value', sizeValue + '%');
    effectImagePreview.style.transform = 'scale(' + sizeValue / MAX_IMAGE_SIZE + ')';
  }
};

var resizeDecrease = function () {
  var sizeValue = parseInt(resizeControlsValue.value, 10);
  if (sizeValue > STEP_SIZE) {
    sizeValue = (sizeValue - STEP_SIZE);
    resizeControlsValue.setAttribute('value', sizeValue + '%');
    effectImagePreview.style.transform = 'scale(' + sizeValue / MAX_IMAGE_SIZE + ')';
  }
};

var uploadLevelPin = function (evt) {
  var value = evt.target.parentElement.getAttribute('for').substring(14);
  effectImagePreview.classList.remove('effect-chrome', 'effect-heat', 'effect-phobos', 'effect-marvin', 'effect-sepia', 'effect-none');

  if (value === 'chrome') {
    effectImagePreview.classList.add('effect-chrome');
    scaleValue.setAttribute('style', 'filter: grayscale(1)');
  } else if (value === 'sepia') {
    effectImagePreview.classList.add('effect-sepia');
    scaleValue.setAttribute('style', 'filter: sepia(1)');
  } else if (value === 'marvin') {
    effectImagePreview.classList.add('effect-marvin');
    scaleValue.setAttribute('style', 'filter: invert(100%)');
  } else if (value === 'phobos') {
    effectImagePreview.classList.add('effect-phobos');
    scaleValue.setAttribute('style', 'filter: blur(3, px)');
  } else if (value === 'heat') {
    effectImagePreview.classList.add('effect-heat');
    scaleValue.setAttribute('style', 'filter: brightness(3)');
  } else {
    effectImagePreview.classList.add('effect-none');
    scaleValue.setAttribute('style', 'filter: none');
  }
};

var pictureClick = function () {
  resizeControlValue.setAttribute('value', '100%');
  for (var i = 0; i < pictureElements.length; i++) {
    pictureElements[i].addEventListener('click', bigPictureClick);
    bigPictureCancel.addEventListener('click', bigPictureClickCancel);
    document.addEventListener('keydown', galleryEsc);
  }
};

var bigPictureClick = function (evt) {
  evt.preventDefault();
  var currentId = evt.target.getAttribute('data-element-id');
  var body = document.querySelector('body');
  bigPicture.classList.remove(HIDDEN_CLASS);
  downloadToBigPicture(pictures, currentId);
  /*  bigPictureImg.setAttribute('src', pictures[currentId].url);
  commentsCount.textContent = pictures[currentId].comments.length;
  likesCount.textContent = pictures[currentId].likes; */
  body.classList.add('modal-open');
};

var initPictures = function () {
  var pictures = getArrayPictures();
  paintingPictures(pictures);
  //  showBigPicture();
  //  downloadToBigPicture(pictures);
  showSocialComments();
  drawNewComments();
};

initPictures();

uploadFile.addEventListener('change', uploadFileOpen);
pictureCancel.addEventListener('click', uploadFileClose);
resizeControlPlus.addEventListener('click', resizeIncrease);
resizeControlMinus.addEventListener('click', resizeDecrease);
imgUploadEffects.addEventListener('mouseup', uploadLevelPin);

