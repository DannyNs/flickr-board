(function (angular) {
    "use strict";

    angular.module("app.flickr")
            .service('flickrRepository', ['CONFIG', '$http', 'FLICKR_FORMATS',
                function (CONFIG, $http, FLICKR_FORMATS) {

                    this.getPublicPhotos = function () {
                        return $http.jsonp(
                                CONFIG.api + 
                                'services/feeds/photos_public.gne?format=' + FLICKR_FORMATS.JSON + 
                                '&jsoncallback=JSON_CALLBACK'
                                );
                    };

                }
            ]);

})(window.angular);