(function (angular) {
    "use strict";

    angular.module('app.flickr')
            .directive('flickrBoard', [
                function () {

                    return {
                        restrict: 'E',
                        scope: {
                            flickrImages: '='
                        },
                        controller: 'flickrBoardController',                        
                        templateUrl: 'app/modules/flickr/directives/flickr-board/flickr-board.html',
                        link: function() {}
                    };
                }
            ]);

})(window.angular);