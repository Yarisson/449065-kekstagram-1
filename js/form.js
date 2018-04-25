'use strict';

(function () {
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_NUMBER_OF_HASHTAGS = 5;
  var buttonSubmitElement = document.querySelector('.img-upload__submit');
  var inputHashTagsElement = document.querySelector('.text__hashtags');
  var textareaCommentsElement = document.querySelector('.text__description');

  var setErrorMessageToHashTags = function (message) {
    inputHashTagsElement.setCustomValidity(message);
    inputHashTagsElement.style.border = '2px solid red';
  };

  var setClearMessageToHashTags = function () {
    inputHashTagsElement.setCustomValidity('');
    inputHashTagsElement.style.border = 'none';
  };

  var onInputHashTagsFocus = function () {
    document.removeEventListener('keydown', window.preview.uploadCancelClickEsc);
  };

  var onInputHashTagsBlur = function () {
    setClearMessageToHashTags();
    document.addEventListener('keydown', window.preview.uploadCancelClickEsc);
  };

  var onTextareaFocus = function () {
    document.removeEventListener('keydown', window.preview.uploadCancelClickEsc);
  };

  var onTextareaBlur = function () {
    document.addEventListener('keydown', window.preview.uploadCancelClickEsc);
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

  var onButtonFormClick = function (evt) {
    evt.preventDefault();
    setClearMessageToHashTags();
    validateHashTags();
  };

  inputHashTagsElement.addEventListener('focus', onInputHashTagsFocus);
  buttonSubmitElement.addEventListener('click', onButtonFormClick);
  inputHashTagsElement.addEventListener('blur', onInputHashTagsBlur);
  textareaCommentsElement.addEventListener('focus', onTextareaFocus);
  textareaCommentsElement.addEventListener('blur', onTextareaBlur);

})();

