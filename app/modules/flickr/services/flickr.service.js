(function (angular, _) {
    "use strict";

    angular.module("app.flickr")
            .service('flickrService', ['localStorageService', 'flickrRepository', 'flickrImageValue', '$q',
                function (localStorageService, flickrRepository, flickrImageValue, $q) {
                    var currentPhotos = {};

                    var getPhotoSrc = function (photo) {
                        return (typeof photo === 'string') ? photo : photo.src;
                    };

                    var addPhoto = function (photo) {
                        var photoSrc = getPhotoSrc(photo);

                        if (_.isUndefined(currentPhotos[photoSrc])) {
                            currentPhotos[photoSrc] = photo;
                        }
                    };

                    var mergePhotos = function (photos) {
                        if (localStorageService.isSupported) {
                            _.forEach(localStorageService.keys(), function(key) {
                                addPhoto(localStorageService.get(key));
                            });
                        }
                        
                        _.forEach(photos, function (photo) {
                            addPhoto(_.extend(_.clone(flickrImageValue), 
                                    {src: photo.media.m, title: photo.title}));
                        });
                    };

                    this.togglePhotoActive = function (photo) {
                        var photoSrc = getPhotoSrc(photo);
                        var photoObj = currentPhotos[photoSrc];

                        if (_.isUndefined(photoObj)) {
                            throw "Photo do not exists";
                        }

                        photoObj.active = !photoObj.active;
                        if (localStorageService.isSupported) {
                            if (photoObj.active === true) {
                                localStorageService.set(photoSrc, photoObj);
                            } else {
                                localStorageService.remove(photoSrc);
                            }
                        }
                    };

                    this.getPublicPhotos = function () {
                        var deferred = $q.defer();

                        flickrRepository.getPublicPhotos()
                                .then(function (response) {
                                    mergePhotos(response.data.items);
                                    deferred.resolve(currentPhotos);
                                })
                                .catch(function (response) {
                                    deferred.reject(response);
                                });

                        return deferred.promise;
                    };

                }
            ]);

})(window.angular, window._);