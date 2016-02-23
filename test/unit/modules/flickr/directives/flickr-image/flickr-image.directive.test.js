(function (describe, it, beforeEach, module, inject, expect, jasmine, _) {
    'use strict';

    describe('flickrImage unit test suite', function () {

        var flickrImage, photos, $rootScope, $compile,
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
        beforeEach(inject(function (_$rootScope_, _$compile_) {
            $rootScope = _$rootScope_;
            $compile = _$compile_;

            $rootScope.flickrImages = photos;
            flickrImage = $compile(html)($rootScope);
            $rootScope.$digest();
        }));

        it('should be defined', function () {
            expect(flickrImage).toBeDefined();
        });

        it('should contain images', function() {
           expect(flickrImage.find('img').length > 0).toBeTruthy(); 
           expect(flickrImage.find('img').length).toEqual(_.keys(photos).length); 
        });

        it('should not contain images', function() {
           $rootScope.flickrImages = [];
           flickrImage = $compile(html)($rootScope);   
           $rootScope.$digest();
           expect(flickrImage.find('img').length > 0).toBeFalsy(); 
        });

    });

})(window.describe, window.it, window.beforeEach, window.module, window.inject, window.expect, window.jasmine, window._);