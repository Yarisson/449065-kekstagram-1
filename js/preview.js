'use strict';

(function () {
  var ESC = 27;
  var SIZE_STEP = 25;
  var MAX_SIZE = 100;
  var SCALE_WIDTH = 455;
  var FILTER_COEFFICIENT_MAX = 1;
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadEffects = document.querySelector('.img-upload__effects');
  var resizeControlValue = document.querySelector('.resize__control--value');
  var resizeControlMinus = document.querySelector('.resize__control--minus');
  var resizeControlPlus = document.querySelector('.resize__control--plus');
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var imgEffect = imgUploadPreview.querySelector('img');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadCancel = document.querySelector('.img-upload__cancel');
  var imgUploadScale = document.querySelector('.img-upload__scale');
  var scalePinElement = imgUploadScale.querySelector('.scale__pin');
  var scaleLevel = document.querySelector('.scale__level');

  var uploadCancelClickHandler = function () {
    imgUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onUploadCancelClickEsc);
    imgUploadCancel.removeEventListener('click', uploadCancelClickHandler);
    document.querySelector('#upload-file').value = '';
  };

  var onUploadCancelClickEsc = function (evt) {
    if (evt.keyCode === ESC) {
      imgUploadOverlay.classList.add('hidden');
      document.removeEventListener('keydown', onUploadCancelClickEsc);
      imgUploadCancel.removeEventListener('click', uploadCancelClickHandler);
      document.querySelector('#upload-file').value = '';
    }
  };

  var onUploadFileClick = function () {
    imgUploadScale.classList.add('hidden');
    resizeControlValue.setAttribute('value', '100%');
    imgUploadOverlay.classList.remove('hidden');
    imgUploadCancel.addEventListener('click', uploadCancelClickHandler);
    document.addEventListener('keydown', onUploadCancelClickEsc);
  };

  var onUploadEffectsClick = function (evt) {
    evt.preventDefault();
    var filterValue = evt.target.parentElement.getAttribute('for').substring(7);
    imgEffect.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--phobos', 'effects__preview--marvin', 'effects__preview--heat', 'effects__preview--none');
    scalePinElement.style.left = SCALE_WIDTH + 'px';
    scaleLevel.setAttribute('style', 'width: 100%');
    uploadLevelPin(FILTER_COEFFICIENT_MAX, filterValue);
  };

  var onResizePlus = function () {
    var sizeValue = parseInt(resizeControlValue.value, 10);
    if (sizeValue < MAX_SIZE) {
      sizeValue = (sizeValue + SIZE_STEP);
      resizeControlValue.setAttribute('value', sizeValue + '%');
      imgEffect.style.transform = 'scale(' + sizeValue / MAX_SIZE + ')';
    }
  };

  var onResizeMinus = function () {
    var sizeValue = parseInt(resizeControlValue.value, 10);
    if (sizeValue > SIZE_STEP) {
      sizeValue = (sizeValue - SIZE_STEP);
      resizeControlValue.setAttribute('value', sizeValue + '%');
      imgEffect.style.transform = 'scale(' + sizeValue / MAX_SIZE + ')';
    }
  };

  var uploadLevelPin = function (coeficient, value) {
    if (value === 'chrome') {
      imgEffect.classList.add('effects__preview--chrome');
      imgUploadScale.classList.remove('hidden');
      imgUploadPreview.setAttribute('style', 'filter: grayscale(' + 1 * coeficient + ')');
    } else if (value === 'sepia') {
      imgEffect.classList.add('effects__preview--sepia');
      imgUploadScale.classList.remove('hidden');
      imgUploadPreview.setAttribute('style', 'filter: sepia(' + 1 * coeficient + ')');
    } else if (value === 'marvin') {
      imgEffect.classList.add('effects__preview--marvin');
      imgUploadScale.classList.remove('hidden');
      imgUploadPreview.setAttribute('style', 'filter: invert(' + 100 * coeficient + '%)');
    } else if (value === 'phobos') {
      imgEffect.classList.add('effects__preview--phobos');
      imgUploadScale.classList.remove('hidden');
      imgUploadPreview.setAttribute('style', 'filter: blur(' + 3 * coeficient + ', px)');
    } else if (value === 'heat') {
      imgEffect.classList.add('effects__preview--heat');
      imgUploadScale.classList.remove('hidden');
      imgUploadPreview.setAttribute('style', 'filter: brightness(' + (1 + 2 * coeficient) + ')');
    } else {
      imgEffect.classList.add('effects__preview--none');
      imgUploadScale.classList.add('hidden');
      imgUploadPreview.setAttribute('style', 'filter: none');
    }
  };

  var resetImgEffect = function () {
    imgUploadScale.classList.add('hidden');
    resizeControlValue.setAttribute('value', '100%');
    imgEffect.style.transform = 'scale(' + 1 + ')';
    imgEffect.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--phobos', 'effects__preview--marvin', 'effects__preview--heat', 'effects__preview--none');
    imgUploadPreview.setAttribute('style', 'filter: none');
    imgUploadOverlay.classList.add('hidden');
  };

  var setupSliderScalePosition = function (scalePosition, width, filterCoefficient, value) {
    if (scalePosition >= SCALE_WIDTH) {
      scalePinElement.style.left = SCALE_WIDTH + 'px';
      scaleLevel.setAttribute('style', 'width: 100%');
      uploadLevelPin(filterCoefficient, value);
    } else if (scalePosition <= 0) {
      scalePinElement.style.left = 0 + 'px';
      scaleLevel.setAttribute('style', 'width: 0%');
      uploadLevelPin(filterCoefficient, value);
    } else {
      scalePinElement.style.left = scalePosition + 'px';
      var currentWidth = width + '%';
      scaleLevel.setAttribute('style', 'width:' + currentWidth + '');
      uploadLevelPin(filterCoefficient, value);
    }
  };

  var onScalePinElementMousedown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var scaleNewPosition = scalePinElement.offsetLeft - shift.x;
      var scaleWidth = (scaleNewPosition / SCALE_WIDTH) * 100;
      var filterWidth = (Math.round((scaleNewPosition / SCALE_WIDTH) * 100) / 100);
      var currentValue = imgEffect.className.substring(18);

      setupSliderScalePosition(scaleNewPosition, scaleWidth, filterWidth, currentValue);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  uploadFile.addEventListener('change', onUploadFileClick);
  imgUploadEffects.addEventListener('click', onUploadEffectsClick);
  resizeControlPlus.addEventListener('click', onResizePlus);
  resizeControlMinus.addEventListener('click', onResizeMinus);
  scalePinElement.addEventListener('mousedown', onScalePinElementMousedown);

  window.preview = {
    onUploadCancelClickEsc: onUploadCancelClickEsc,
    resetImgEffect: resetImgEffect
  };
})();
