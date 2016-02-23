(function (angular) {
    "use strict";

    angular.module("app.flickr", [])
            .config(['$stateProvider',
                function ($stateProvider) {
                    $stateProvider
                            .state('main', {
                                url: "/",
                                templateUrl: "app/modules/flickr/views/main.html",
                                controller: "mainController",
                                resolve: {
                                    flickrImages: ['flickrService',
                                        function (flickrService) {
                                            return flickrService.getPublicPhotos();
                                        }]
                                }
                            });
                }
            ]);

})(window.angular);