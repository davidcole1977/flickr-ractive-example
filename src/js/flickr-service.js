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

