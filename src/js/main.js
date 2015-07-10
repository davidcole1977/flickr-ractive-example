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
