(function ($, document, angular, _) {
    'use strict';

    var angularApp = angular.module('app', [
        'ui.router',
        'LocalStorageModule',
        'app.flickr'
    ]).config(['$urlRouterProvider', function ($urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
        }
    ]);

    // get config and bootstrap the application
    $.ajax({
        url: 'config.json?t=' + new Date().getTime(),
        // if we run unit tests we must wait for config to load
        async: false,
        success: function (config) {

            // assign config to the CONFIG const
            angularApp.constant('CONFIG', config);

            // bootstrap application
            angular.element(document).ready(function () {
                angular.bootstrap(document, ['app']);
            });
        }
    });

})(window.jQuery, window.document, window.angular, window._);