(function (describe, it, beforeEach, module, inject, expect, jasmine) {
    'use strict';

    describe('mainController unit test suite', function () {

        var mainController, $scope, photos;

        // load app
        beforeEach(module('app'));

        // create and load mocks
        beforeEach(module(function ($provide) {
            jasmine.getFixtures().fixturesPath = "/base/test/unit/fixtures/";
            photos = JSON.parse(readFixtures('photos.json'));
            $provide.value('flickrImages', photos);
        }));

        // prepare test objects
        beforeEach(inject(function ($rootScope, $controller, flickrImages) {
            $scope = $rootScope.$new();
            mainController = $controller('mainController', {
                $scope: $scope,
                flickrImages: flickrImages
            });

        }));

        it('should be defined', function () {
            expect(mainController).toBeDefined();
        });

        it('should have scope variable flickrImages', function() {
           expect($scope.flickrImages).toBeDefined(); 
           expect($scope.flickrImages).toEqual(photos);
        });

    });

})(window.describe, window.it, window.beforeEach, window.module, window.inject, window.expect, window.jasmine);
