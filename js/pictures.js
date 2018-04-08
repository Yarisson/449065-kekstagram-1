'use strict';

var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var description = [
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
    objectPhoto.description = description[randomNumber(0, 5)];
    var indexComments = randomNumber(1, 2);
    for (var j = 0; j < indexComments; j++) {
      objectPhoto.comments = comments[randomNumber(0, 5)];
    }
    tempPictures[i - 1] = objectPhoto;
  }
  return tempPictures;
};

var pictures = getArrayPictures();
var pictureTemplate = document.querySelector('#picture').content;

var renderPicture = function (picture, index) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').setAttribute('src', picture.url);
  pictureElement.querySelector('.picture__img').setAttribute('data-element-id', index);
  pictureElement.querySelector('.picture__stat--comments').textContent = picture.comments;
  pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
  return pictureElement;
};

var picturesDraw = document.querySelector('.pictures');

var paintingPictures = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length - 1; i++) {
    fragment.appendChild(renderPicture(array[i], i));
  }
  picturesDraw.appendChild(fragment);
};

paintingPictures(pictures);

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

document.querySelector('.big-picture__img').setAttribute('src', pictures[0].url);
document.querySelector('.likes-count').textContent = pictures[0].likes;
document.querySelector('.comments-count').textContent = pictures[0].comments.length;
for (var i = 0; i < pictures[0].comments.length; i++) {
  document.querySelectorAll('.social__comment').textContent = pictures[0].comments[i];
}

var socialCommentCount = document.querySelector('.social__comment-count');
var socialCommentLoadmore = document.querySelector('.social__comment-loadmore');
socialCommentCount.classList.add('visually-hidden');
socialCommentLoadmore.classList.add('visually-hidden');
/* var pictures = [];

for (var i = 1; i < 26; i++) {
  var photoObject = {};
  photoObject.url = 'photos/' + i + '.jpg';
  photoObject.likes = randomNumber(15, 200);
  photoObject.description = description[randomNumber(0, 5)];
  var indexComments = randomNumber(1, 2);
  for (var j = 0; j < indexComments; j++) {
    photoObject.comments = comments[randomNumber(0, 5)];
  }
  pictures[i - 1] = photoObject;
}

console.log(pictures); */
