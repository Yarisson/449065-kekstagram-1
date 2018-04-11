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

/* var renderSocialComments = function (array, index) {
  var socialCommentTemplate = document.querySelector('.social__comment');
  var socialCommentElement = socialCommentTemplate.cloneNode(true);
  socialCommentElement.querySelector('.social__comment--text').textContent = array.comments[index];
}; */

/* var paintingSocialComments = function (array) {
  var socialCommentsDraw = document.querySelector('.social__comments');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length - 1; i++) {
    fragment.appendChild(renderSocialComments(array[i], i));
  }
  socialCommentsDraw.appendChild(fragment);
}; */

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

var downloadToBigPicture = function (array) {
  document.querySelector('.big-picture__img').setAttribute('src', array[0].url);
  document.querySelector('.likes-count').textContent = array[0].likes;
  document.querySelector('.comments-count').textContent = array[0].comments.length;
/*  for (var i = 0; i < array[0].comments.length; i++) {
    document.querySelectorAll('.social__comment').textContent = array[0].comments[i];
  } */
};

var showSocialComments = function () {
  var socialCommentCount = document.querySelector('.social__comment-count');
  var socialCommentLoadmore = document.querySelector('.social__comment-loadmore');
  socialCommentCount.classList.add('visually-hidden');
  socialCommentLoadmore.classList.add('visually-hidden');
};

var newElementDraw = function (array) {
  var fragment = document.createDocumentFragment();
  var socialCommentsDraw = document.querySelector('.social__comments');
  for (var i = 0; i < array[0].comments.length; i++) {
    var avatarNumber = randomNumber(1, 6);
    avatarNumber = avatarNumber + '';
    var newSocialElement = document.createElement('li');
    newSocialElement.className = 'social__comment social__comment--text';
    newSocialElement.innerHTML = '<img class="social__picture" src="img/avatar-avatarNumber.svg" alt="Аватар комментатора фотографии" width="35" height="35">' + array[0].comments[i];
    fragment.appendChild(newSocialElement);
  }
  socialCommentsDraw.appendChild(fragment);
};

var initPictures = function () {
  var pictures = getArrayPictures();
  paintingPictures(pictures);
  showBigPicture();
  downloadToBigPicture(pictures);
  showSocialComments();
  // paintingSocialComments(pictures);
  newElementDraw(pictures);
};

initPictures();


