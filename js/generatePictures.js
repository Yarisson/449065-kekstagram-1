'use strict';
// первый модуль - исходные данные, генерация фотографий

window.generatePictures = (function () {

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

  return {
    randomNumber: function (a, b) {
      return a + Math.round((b - a) * Math.random());
    },
    getArrayPictures: function () {
      var tempPictures = [];
      for (var i = 1; i < 26; i++) {
        var objectPhoto = {};
        objectPhoto.url = 'photos/' + i + '.jpg';
        objectPhoto.likes = window.generatePictures.randomNumber(15, 200);
        objectPhoto.description = DESCRIPTIONS[window.generatePictures.randomNumber(0, 5)];
        objectPhoto.comment = [];
        var indexComments = window.generatePictures.randomNumber(1, 2);
        for (var j = 0; j < indexComments; j++) {
          objectPhoto.comment.push(COMMENTS[window.generatePictures.randomNumber(0, 5)]);
        }
        tempPictures[i - 1] = objectPhoto;
      }
      return tempPictures;
    }
  };
})();
