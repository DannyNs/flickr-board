(function (angular) {
    "use strict";

    angular.module("app.flickr")
            .controller('mainController', ['$scope', 'flickrImages',
                function ($scope, flickrImages) {
                    $scope.flickrImages = flickrImages;
                }
            ]);

})(window.angular);