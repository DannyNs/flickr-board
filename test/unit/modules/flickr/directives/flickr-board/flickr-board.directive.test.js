(function (describe, it, beforeEach, module, inject, expect, jasmine) {
    'use strict';

    describe('flickrBoard unit test suite', function () {

        var flickrBoard, $scope, photos,
        html = '<flickr-board flickr-images="flickrImages"></flickr-board>';

        // load app
        beforeEach(module('app'));

        // create and load mocks
        beforeEach(module(function ($provide) {
            jasmine.getFixtures().fixturesPath = "/base/test/unit/fixtures/";
            photos = JSON.parse(readFixtures('photos.json'));
            $provide.value('flickrImages', photos);
        }));

        // prepare test objects
        beforeEach(inject(function ($rootScope, $compile) {
            $rootScope.flickrImages = photos;
            flickrBoard = $compile(html)($rootScope);
            $rootScope.$digest();
        }));

        it('should be defined', function () {
            expect(flickrBoard).toBeDefined();
        });

        it('should contain flickrImages', function () {
            expect(flickrBoard.isolateScope().flickrImages).toBeDefined();
        });

        it('should contain h2 element', function () {
            expect(flickrBoard.find('h2').length > 0).toBeTruthy();
        });

    });

})(window.describe, window.it, window.beforeEach, window.module, window.inject, window.expect, window.jasmine);