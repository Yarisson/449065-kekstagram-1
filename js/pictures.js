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
    objectPhoto.comment = [];
    var indexComments = randomNumber(1, 2);
    for (var j = 0; j < indexComments; j++) {
      objectPhoto.comment.push(COMMENTS[randomNumber(0, 5)]);
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
  pictureElement.querySelector('.picture__stat--comments').textContent = picture.comment.length;
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

var addComment = function (index, array, commentIndex) {
  var element = document.createElement('li');

  element.classList.add('social__comment');
  element.classList.add('social__comment--text');
  element.textContent = array[index].comment[commentIndex];

  var avatar = document.createElement('img');
  avatar.className = 'social__picture';
  avatar.src = 'img/avatar-' + randomNumber(1, 6) + '.svg';
  avatar.alt = 'Аватар комментатора фотографии';
  avatar.width = 35;
  avatar.height = 35;
  element.insertBefore(avatar, element.firstChild);

  return element;
};

var drawNewComments = function (commentsToDraw) {
  var socialCommentsDraw = document.querySelector('.social__comments');
  socialCommentsDraw.appendChild(commentsToDraw);
};

var showBigPicture = function (url, indexId, array) {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');
  document.querySelector('.big-picture__img').querySelector('img').setAttribute('src', url);
  document.querySelector('.likes-count').textContent = pictureStatLikes[indexId].textContent;
  document.querySelector('.comments-count').textContent = pictureStatComments[indexId].textContent;
  var commentElements = [];
  for (var j = 0; j < array[indexId].comment.length; j++) {
    commentElements[j] = addComment(indexId, array, j);
    drawNewComments(commentElements[j]);
  }
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

var showSocialComments = function () {
  var socialCommentCount = document.querySelector('.social__comment-count');
  var socialCommentLoadmore = document.querySelector('.social__comment-loadmore');
  socialCommentCount.classList.add('visually-hidden');
  socialCommentLoadmore.classList.add('visually-hidden');
};

var arrayPictures = [];

var initPictures = function () {
  var pictures = getArrayPictures();
  paintingPictures(pictures);
  arrayPictures = pictures;
};

initPictures();

// 4 Задание

var pictureLink = document.querySelectorAll('.picture__link');
var pictureStatLikes = document.querySelectorAll('.picture__stat--likes');
var pictureStatComments = document.querySelectorAll('.picture__stat--comments');
var uploadFile = document.querySelector('#upload-file');
var imgUploadEffects = document.querySelector('.img-upload__effects');
var resizeControlValue = document.querySelector('.resize__control--value');
var resizeControlMinus = document.querySelector('.resize__control--minus');
var resizeControlPlus = document.querySelector('.resize__control--plus');
var imgUploadPreview = document.querySelector('.img-upload__preview');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var imgUploadCancel = document.querySelector('.img-upload__cancel');
var socialComments = document.querySelector('.social__comments');

var bigPictureCancelClickHandler = function () {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  clearComments();
};

var ESC = 27;
var SIZE_STEP = 25;
var MAX_SIZE = 100;

var bigPictureCancelClickEsc = function (evt) {
  if (evt.keyCode === ESC) {
    var bigPicture = document.querySelector('.big-picture');
    bigPicture.classList.add('hidden');
    document.body.classList.add('modal-open');
    clearComments();
  }
};

var pictureClickHandler = function (evt) {
  evt.preventDefault();
  document.body.classList.add('modal-open');
  var currentId = evt.target.getAttribute('data-element-id');
  var imgSrc = evt.target.getAttribute('src');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  showBigPicture(imgSrc, currentId, arrayPictures);
  showSocialComments();
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.social__comment-loadmore').classList.add('hidden');
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
  document.removeEventListener('keydown', uploadCancelClickEsc);
  imgUploadCancel.removeEventListener('click', uploadCancelClickHandler);
  document.querySelector('#upload-file').value = '';
};

var uploadCancelClickEsc = function (evt) {
  if (evt.keyCode === ESC) {
    imgUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', uploadCancelClickEsc);
    imgUploadCancel.removeEventListener('click', uploadCancelClickHandler);
    document.querySelector('#upload-file').value = '';
  }
};

var uploadFileClickHandler = function () {
  resizeControlValue.setAttribute('value', '100%');
  imgUploadOverlay.classList.remove('hidden');
  imgUploadCancel.addEventListener('click', uploadCancelClickHandler);

  document.addEventListener('keydown', uploadCancelClickEsc);
};

var uploadLevelPin = function (evt) {
  evt.preventDefault();
  var imgEffect = imgUploadPreview.querySelector('img');
  var value = evt.target.parentElement.getAttribute('for').substring(7);
  imgEffect.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--phobos', 'effects__preview--marvin', 'effects__preview--heat', 'effects__preview--none');

  if (value === 'chrome') {
    imgEffect.classList.add('effects__preview--chrome');
    imgUploadPreview.setAttribute('style', 'filter: grayscale(1)');
  } else if (value === 'sepia') {
    imgEffect.classList.add('effects__preview--sepia');
    imgUploadPreview.setAttribute('style', 'filter: sepia(1)');
  } else if (value === 'marvin') {
    imgEffect.classList.add('effects__preview--marvin');
    imgUploadPreview.setAttribute('style', 'filter: invert(10%)');
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
  if (sizeValue < MAX_SIZE) {
    sizeValue = (sizeValue + SIZE_STEP);
    resizeControlValue.setAttribute('value', sizeValue + '%');
    imgUploadPreview.style.transform = 'scale(' + sizeValue / MAX_SIZE + ')';
  }
};

var resizeMinus = function () {
  var sizeValue = parseInt(resizeControlValue.value, 10);
  if (sizeValue > SIZE_STEP) {
    sizeValue = (sizeValue - SIZE_STEP);
    resizeControlValue.setAttribute('value', sizeValue + '%');
    imgUploadPreview.style.transform = 'scale(' + sizeValue / MAX_SIZE + ')';
  }
};

clickPictures(pictureLink);

uploadFile.addEventListener('change', uploadFileClickHandler);
imgUploadEffects.addEventListener('click', uploadLevelPin);
resizeControlPlus.addEventListener('click', resizePlus);
resizeControlMinus.addEventListener('click', resizeMinus);

var MAX_HASHTAG_LENGTH = 20;
var MAX_NUMBER_OF_HASHTAGS = 5;
var buttonSubmitElement = document.querySelector('.img-upload__submit');
var inputHashTagsElement = document.querySelector('.text__hashtags');
var textareaCommentsElement = document.querySelector('.text__description');

var setErrorMessageToHashTags = function (message) {
  inputHashTagsElement.setCustomValidity(message);
  inputHashTagsElement.style.border = '2px solid red';
};

var onInputHashTagsFocus = function () {
  document.removeEventListener('keydown', uploadCancelClickEsc);
};

var onInputHashTagsBlur = function () {
  document.addEventListener('keydown', uploadCancelClickEsc);
};

var onTextareaFocus = function () {
  document.removeEventListener('keydown', uploadCancelClickEsc);
};

var onTextareaBlur = function () {
  document.addEventListener('keydown', uploadCancelClickEsc);
};

var validateHashTags = function () {
  var SEPARATOR = ' ';
  var hashTagString = inputHashTagsElement.value.toLowerCase();
  var hashTagsArray = hashTagString.split(SEPARATOR);
  if (hashTagsArray.length > MAX_NUMBER_OF_HASHTAGS) {
    setErrorMessageToHashTags('Количество хэш-тегов не может быть больше 5');
    return;
  }
  for (var i = 0; i < hashTagsArray.length; i++) {
    if (hashTagsArray[i].charAt(0) !== '#') {
      setErrorMessageToHashTags('Отсутствует символ # в начале хэш-тега');
      return;
    }
    if (hashTagsArray[i].length > MAX_HASHTAG_LENGTH) {
      setErrorMessageToHashTags('Длина одного хэш-тега не должна быть больше символов 20');
      return;
    }
    var hashTagIndex = i;
    for (var j = hashTagIndex + 1; j < hashTagsArray.length; j++) {
      if (hashTagsArray[i] === hashTagsArray[j]) {
        setErrorMessageToHashTags('Нельзя использовать одинаковые хэш-теги');
        return;
      }
    }
  }
};

var onButtonFormClick = function () {
  validateHashTags();
};

inputHashTagsElement.addEventListener('focus', onInputHashTagsFocus);
buttonSubmitElement.addEventListener('click', onButtonFormClick);
inputHashTagsElement.addEventListener('blur', onInputHashTagsBlur);
textareaCommentsElement.addEventListener('focus', onTextareaFocus);
textareaCommentsElement.addEventListener('blur', onTextareaBlur);
