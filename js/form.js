'use strict';

(function () {
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_NUMBER_OF_HASHTAGS = 5;
  var uploadFile = document.querySelector('#upload-file');
  var buttonSubmitElement = document.querySelector('.img-upload__submit');
  var inputHashTagsElement = document.querySelector('.text__hashtags');
  var textareaCommentsElement = document.querySelector('.text__description');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var form = document.querySelector('.img-upload__form');

  var resetFormTextClear = function () {
    uploadFile.value = '';
    inputHashTagsElement.value = '';
    textareaCommentsElement.value = '';
  };

  var setErrorMessageToHashTags = function (message) {
    inputHashTagsElement.setCustomValidity(message);
    inputHashTagsElement.style.border = '2px solid red';
  };

  var setClearMessageToHashTags = function () {
    inputHashTagsElement.setCustomValidity('');
    inputHashTagsElement.style.border = 'none';
  };

  var onInputHashTagsFocus = function () {
    document.removeEventListener('keydown', window.preview.onUploadCancelClickEsc);
  };

  var onInputHashTagsBlur = function () {
    document.addEventListener('keydown', window.preview.onUploadCancelClickEsc);
  };

  var onTextareaFocus = function () {
    document.removeEventListener('keydown', window.preview.onUploadCancelClickEsc);
  };

  var onTextareaBlur = function () {
    document.addEventListener('keydown', window.preview.onUploadCancelClickEsc);
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
        if (hashTagsArray.length === 1 && hashTagsArray[0] === '') {
          return;
        }
        setErrorMessageToHashTags('Отсутствует символ # в начале хэш-тега');
        return;
      }

      if (hashTagsArray[i].length < 2) {
        setErrorMessageToHashTags('После символа # должен быть текст');
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
    var imgUploadMessageError = document.querySelector('.img-upload__message--error');
    setClearMessageToHashTags();
    validateHashTags();
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      window.backend.upload(new FormData(form), function () {
        resetFormTextClear();
        window.preview.resetImgEffect();
        imgUploadOverlay.classList.add('hidden');
      }, function () {
        imgUploadMessageError.classList.remove('.hidden');
      });

    });
  };

  inputHashTagsElement.addEventListener('focus', onInputHashTagsFocus);
  buttonSubmitElement.addEventListener('click', onButtonFormClick);
  inputHashTagsElement.addEventListener('blur', onInputHashTagsBlur);
  textareaCommentsElement.addEventListener('focus', onTextareaFocus);
  textareaCommentsElement.addEventListener('blur', onTextareaBlur);

})();
