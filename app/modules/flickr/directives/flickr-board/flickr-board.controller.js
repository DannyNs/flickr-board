(function (angular) {
    "use strict";

    angular.module("app.flickr")
            .controller('flickrBoardController', ['$scope', 'flickrService', 'TAG_NAMES',
                function ($scope, flickrService, TAG_NAMES) {

                    $scope.handleBoardClick = function ($event) {
                        var target = angular.element($event.target)[0];

                        if (target.tagName === TAG_NAMES.IMG) {
                            flickrService.togglePhotoActive(target.src);
                        }
                    };

                }
            ]);

})(window.angular);