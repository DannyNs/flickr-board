(function (describe, it, beforeEach, module, inject, expect, jasmine, angular, spyOn) {
    'use strict';

    describe(' unit test suite', function () {

        var flickrBoardController, $scope, flickrService, photos;

        // load app
        beforeEach(module('app'));

        // create and load mocks
        beforeEach(module(function ($provide) {
            jasmine.getFixtures().fixturesPath = "/base/test/unit/fixtures/";
            photos = JSON.parse(readFixtures('photos.json'));
            $provide.value('flickrImages', photos);
        }));

        // prepare test objects
        beforeEach(inject(function ($rootScope, $controller, _flickrService_, _TAG_NAMES_) {
            $scope = $rootScope.$new();
            flickrService = _flickrService_;

            flickrBoardController = $controller('flickrBoardController', {
                $scope: $scope,
                flickrService: flickrService,
                TAG_NAMES: _TAG_NAMES_
            });
            
            spyOn(flickrService, 'togglePhotoActive');
        }));

        it('should be defined', function () {
            expect(flickrBoardController).toBeDefined();
        });

        it('should handle flickr board click', function() {            
            var $event = {
                target: angular.element('<img/>')
            };
            $scope.handleBoardClick($event);
            expect(flickrService.togglePhotoActive).toHaveBeenCalled();
        });
        
        it('should ignore flickr board click', function() {
            var $event = {
                target: angular.element('<div/>')
            };
            $scope.handleBoardClick($event);
            expect(flickrService.togglePhotoActive).not.toHaveBeenCalled();   
        });

    });

})(window.describe, window.it, window.beforeEach, window.module, window.inject, window.expect, window.jasmine, window.angular, window.spyOn);