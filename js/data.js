'use strict';

(function () {
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

  window.data = {
    randomNumber: randomNumber,
    getArrayPictures: getArrayPictures
  };
})();
