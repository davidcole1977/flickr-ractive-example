(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = (function () {
  'use strict';

  var restEndPoint = 'https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?';

  function getLatestPhotosJSON (tags, callback) {
    $.get(
      restEndPoint,
      {
        tags: tags,
        format: 'json'
      },
      callback,
      'json'
    ); 
  }

  function getLatestPhotosByTag (tags, callback) {
    getLatestPhotosJSON(tags, function (data) {
      callback(extractLatestPhotos(data));
    });
  }

  function extractLatestPhotos (data) {
    return data.items;
  }

  return {
    getLatestPhotosByTag: getLatestPhotosByTag
  };

}());


},{}],2:[function(require,module,exports){
(function () {
  'use strict';

  var flickr = require('./flickr-service'),
      photosRactive,
      defaultTags = 'quokka';

  function onDOMReady () {
    photosRactive = new Ractive({
      el: '#photos-container',
      template: '#photos-template',
      data: {
        photos: [],
        tags: defaultTags
      },
      oncomplete: loadPhotos
    });

    photosRactive.on('onUpdatePhotos', loadPhotos);

    function loadPhotos () {
      var tags = photosRactive.get('tags');

      flickr.getLatestPhotosByTag(tags, function (photos) {
        photosRactive.set('photos', photos);
      });
    }
  }

  document.addEventListener("DOMContentLoaded", onDOMReady);

})();

},{"./flickr-service":1}]},{},[2]);
