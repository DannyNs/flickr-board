(function (angular) {
    "use strict";

    angular.module('app.flickr')
            .directive('flickrImage', [
                function () {

                    return {
                        require: ['^flickrBoard'],
                        restrict: 'E',
                        templateUrl: 'app/modules/flickr/directives/flickr-image/flickr-image.html',
                        link: function() {}
                    };
                }
            ]);

})(window.angular);