(function (angular) {
    'use strict';

    angular.module('app.flickr')
            .value('flickrImageValue', {
                src: null,
                active: false,
                title: ""
            });

})(window.angular);