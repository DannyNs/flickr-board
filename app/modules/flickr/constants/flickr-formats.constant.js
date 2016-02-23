(function (angular) {
    'use strict';

    angular.module('app.flickr')
            .constant('FLICKR_FORMATS', {
                PHP: 'php', 
                PHP_SERIAL: 'php_serial',
                CSV: 'csv', 
                JSON: 'json', 
                SQL: 'sql', 
                YAML: 'yaml', 
                CDF: 'cdf'
            });

})(window.angular);